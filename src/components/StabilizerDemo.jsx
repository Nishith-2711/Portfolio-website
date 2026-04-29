import { useState, useRef, useCallback, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_STABILIZER_API_URL || 'http://localhost:8000';

const StabilizerDemo = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const pollRefsRef = useRef({});
  const elapsedRefsRef = useRef({});
  const videoRefsRef = useRef({});

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      Object.values(pollRefsRef.current).forEach(clearInterval);
    };
  }, [onClose]);

  const syncVideos = (jobId, source, target) => {
    if (Math.abs(source.currentTime - target.currentTime) > 0.2) {
      target.currentTime = source.currentTime;
    }
  };

  const setupVideoSync = (jobId) => {
    const original = videoRefsRef.current[`${jobId}-original`];
    const stabilized = videoRefsRef.current[`${jobId}-stabilized`];
    if (!original || !stabilized) return;

    const handlePlay = () => {
      if (original.paused) original.play();
      if (stabilized.paused) stabilized.play();
    };

    const handlePause = () => {
      if (!original.paused) original.pause();
      if (!stabilized.paused) stabilized.pause();
    };

    const handleOriginalTimeUpdate = () => syncVideos(jobId, original, stabilized);
    const handleStabilizedTimeUpdate = () => syncVideos(jobId, stabilized, original);

    original.addEventListener('play', handlePlay);
    original.addEventListener('pause', handlePause);
    original.addEventListener('timeupdate', handleOriginalTimeUpdate);
    stabilized.addEventListener('play', handlePlay);
    stabilized.addEventListener('pause', handlePause);
    stabilized.addEventListener('timeupdate', handleStabilizedTimeUpdate);
  };

  const upload = async (files) => {
    if (!files || files.length === 0) return;
    const valid = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo'];

    const validFiles = Array.from(files).filter(file => {
      if (!valid.includes(file.type)) {
        setError(`Skipped ${file.name}: Invalid file type. Use MP4, AVI, or MOV.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;
    setError(null);

    // Upload all files
    for (const file of validFiles) {
      uploadSingleFile(file);
    }
  };

  const uploadSingleFile = async (file) => {
    const jobId = `${Date.now()}-${Math.random()}`;

    // Add to jobs list with uploading status
    setJobs(prev => [...prev, {
      job_id: jobId,
      status: 'uploading',
      progress: 0,
      input_video: file.name,
      output_video: null,
      error: null,
      elapsed: 0
    }]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/api/v1/stabilize`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();

      // Update with actual job_id from backend
      setJobs(prev => prev.map(j => j.job_id === jobId ? { ...j, job_id: data.job_id, status: 'queued' } : j));
      startPolling(data.job_id);
    } catch {
      setJobs(prev => prev.map(j => j.job_id === jobId ? { ...j, status: 'failed', error: 'Upload failed. Try again.' } : j));
    }
  };

  const startPolling = (jobId) => {
    elapsedRefsRef.current[jobId] = 0;

    const pollInterval = setInterval(async () => {
      elapsedRefsRef.current[jobId] += 2;
      try {
        const res = await fetch(`${API_BASE}/api/v1/status/${jobId}`);
        const data = await res.json();

        setJobs(prev => prev.map(j => {
          if (j.job_id !== jobId) return j;

          if (data.status === 'processing') {
            return {
              ...j,
              status: 'processing',
              progress: Math.min(90, (elapsedRefsRef.current[jobId] / 45) * 100)
            };
          } else if (data.status === 'completed') {
            clearInterval(pollInterval);
            return {
              ...j,
              status: 'completed',
              progress: 100,
              output_video: data.output_video,
              input_video: data.input_video
            };
          } else if (data.status === 'failed') {
            clearInterval(pollInterval);
            return {
              ...j,
              status: 'failed',
              error: data.error || 'Processing failed.'
            };
          }
          return j;
        }));
      } catch {
        // network hiccup — keep polling
      }
    }, 2000);

    pollRefsRef.current[jobId] = pollInterval;
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    upload(e.dataTransfer.files);
  }, []);

  const reset = () => {
    Object.values(pollRefsRef.current).forEach(clearInterval);
    pollRefsRef.current = {};
    elapsedRefsRef.current = {};
    setJobs([]);
    setError(null);
  };

  const getStatusLabel = (status) => {
    const labels = {
      uploading: 'Uploading...',
      queued: 'Queued — waiting for worker...',
      processing: 'Stabilizing — SIFT · Gaussian smoothing · warpAffine...',
      completed: 'Done!',
      failed: 'Failed'
    };
    return labels[status] || status;
  };

  const getStatusPercent = (job) => {
    const percents = {
      uploading: 15,
      queued: 0,
      processing: job.progress,
      completed: 100
    };
    return percents[job.status] || 0;
  };

  const isIdle = jobs.length === 0;

  return (
    <div
      className="stabilizer-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="stabilizer-modal">

        {/* Header */}
        <div className="stabilizer-modal-header">
          <div>
            <h3>Cricket Video Stabilizer</h3>
            <p>Upload shaky cricket clips — get stabilized videos back</p>
          </div>
          <button className="stabilizer-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Drop zone — always available */}
        <div
          className={`stabilizer-drop-zone ${dragActive ? 'drag-active' : ''} ${!isIdle ? 'stabilizer-drop-zone-compact' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        >
          <div className="stabilizer-drop-icon">{isIdle ? '🎬' : '➕'}</div>
          <p>{isIdle ? 'Drop videos here' : 'Drop more videos to add'}</p>
          <span>or click to browse</span>
          <p className="stabilizer-hint">MP4 · AVI · MOV</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/avi,video/quicktime,video/x-msvideo"
            onChange={(e) => upload(e.target.files)}
            multiple
            hidden
          />
        </div>

        {/* Error shown under drop zone */}
        {error && isIdle && (
          <p className="stabilizer-error-inline">{error}</p>
        )}

        {/* Jobs list */}
        {!isIdle && (
          <div className="stabilizer-jobs-container">
            <div className="stabilizer-jobs-header">
              <h4>{jobs.length} video{jobs.length !== 1 ? 's' : ''}</h4>
              <button
                className="btn btn-outline"
                onClick={() => fileInputRef.current?.click()}
                style={{ fontSize: '0.85rem', padding: '6px 18px', minHeight: 'unset' }}
              >
                + Add videos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/avi,video/quicktime,video/x-msvideo"
                onChange={(e) => upload(e.target.files)}
                multiple
                hidden
              />
            </div>

            <div className="stabilizer-jobs-list">
              {jobs.map((job) => (
                <div key={job.job_id} className={`stabilizer-job-item stabilizer-job-${job.status}`}>
                  <div className="stabilizer-job-info">
                    <div className="stabilizer-job-name">{job.input_video}</div>
                    <div className="stabilizer-job-status">{getStatusLabel(job.status)}</div>
                    {job.error && <div className="stabilizer-job-error">{job.error}</div>}
                  </div>
                  <div className="stabilizer-job-progress">
                    <div className="stabilizer-progress-bar" style={{ width: '100px' }}>
                      <div
                        className="stabilizer-progress-fill"
                        style={{ width: `${getStatusPercent(job)}%` }}
                      />
                    </div>
                    <span className="stabilizer-progress-label">{Math.round(getStatusPercent(job))}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed videos */}
        {jobs.filter(j => j.status === 'completed').length > 0 && (
          <div className="stabilizer-results-container">
            <h4>Completed ({jobs.filter(j => j.status === 'completed').length})</h4>
            <div className="stabilizer-results-list">
              {jobs.filter(j => j.status === 'completed').map((job) => (
                <div key={job.job_id} className="stabilizer-result-item">
                  <div className="stabilizer-result-title">{job.input_video}</div>
                  <div className="stabilizer-videos">
                    <div className="stabilizer-video-block">
                      <label>Original</label>
                      <video
                        ref={(el) => { if (el) videoRefsRef.current[`${job.job_id}-original`] = el; }}
                        onLoadedMetadata={() => setupVideoSync(job.job_id)}
                        controls
                        src={`${API_BASE}/api/v1/video/raw/${job.input_video}`}
                      />
                    </div>
                    <div className="stabilizer-video-block">
                      <label>Stabilized</label>
                      <video
                        ref={(el) => { if (el) videoRefsRef.current[`${job.job_id}-stabilized`] = el; }}
                        controls
                        src={`${API_BASE}/api/v1/video/processed/${job.output_video}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {jobs.some(j => ['uploading', 'queued', 'processing'].includes(j.status)) && (
              <button
                className="btn btn-primary"
                onClick={reset}
                style={{ marginTop: '16px' }}
              >
                Upload more
              </button>
            )}
          </div>
        )}

        {/* Tech tags */}
        <div className="stabilizer-tech-footer">
          {['FastAPI', 'Redis · RQ', 'OpenCV SIFT', 'FFmpeg', 'Docker'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StabilizerDemo;
