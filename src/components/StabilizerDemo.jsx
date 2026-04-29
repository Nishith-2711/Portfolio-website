import { useState, useRef, useCallback, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_STABILIZER_API_URL || 'http://localhost:8000';

const StabilizerDemo = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const pollRef = useRef(null);
  const elapsedRef = useRef(0);
  const originalVideoRef = useRef(null);
  const stabilizedVideoRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearInterval(pollRef.current);
    };
  }, [onClose]);

  useEffect(() => {
    if (!jobData || !originalVideoRef.current || !stabilizedVideoRef.current) return;

    const original = originalVideoRef.current;
    const stabilized = stabilizedVideoRef.current;
    let syncTimeout;

    const syncVideos = (source, target) => {
      if (Math.abs(source.currentTime - target.currentTime) > 0.2) {
        target.currentTime = source.currentTime;
      }
    };

    const handlePlay = () => {
      if (original.paused) original.play();
      if (stabilized.paused) stabilized.play();
    };

    const handlePause = () => {
      if (!original.paused) original.pause();
      if (!stabilized.paused) stabilized.pause();
    };

    const handleOriginalTimeUpdate = () => syncVideos(original, stabilized);
    const handleStabilizedTimeUpdate = () => syncVideos(stabilized, original);

    original.addEventListener('play', handlePlay);
    original.addEventListener('pause', handlePause);
    original.addEventListener('timeupdate', handleOriginalTimeUpdate);
    stabilized.addEventListener('play', handlePlay);
    stabilized.addEventListener('pause', handlePause);
    stabilized.addEventListener('timeupdate', handleStabilizedTimeUpdate);

    return () => {
      original.removeEventListener('play', handlePlay);
      original.removeEventListener('pause', handlePause);
      original.removeEventListener('timeupdate', handleOriginalTimeUpdate);
      stabilized.removeEventListener('play', handlePlay);
      stabilized.removeEventListener('pause', handlePause);
      stabilized.removeEventListener('timeupdate', handleStabilizedTimeUpdate);
      clearTimeout(syncTimeout);
    };
  }, [jobData]);

  const upload = async (file) => {
    if (!file) return;
    const valid = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo'];
    if (!valid.includes(file.type)) {
      setError('Please upload an MP4, AVI, or MOV file.');
      return;
    }

    setError(null);
    elapsedRef.current = 0;

    // Wake the Render free-tier server before uploading (cold starts take 30–60s)
    setStatus('waking');
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 70000);
      await fetch(`${API_BASE}/health`, { signal: ctrl.signal });
      clearTimeout(timeout);
    } catch {
      // If /health doesn't exist or times out, proceed anyway — upload will surface the real error
    }

    setStatus('uploading');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/api/v1/stabilize`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setJobData(data);
      setStatus('queued');
      startPolling(data.job_id);
    } catch {
      setStatus('failed');
      setError('Upload failed. The server may be unavailable — try again in a moment.');
    }
  };

  const startPolling = (jobId) => {
    pollRef.current = setInterval(async () => {
      elapsedRef.current += 2;
      try {
        const res = await fetch(`${API_BASE}/api/v1/status/${jobId}`);
        const data = await res.json();
        setJobData(data);

        if (data.status === 'processing') {
          setStatus('processing');
          setProgress(Math.min(90, (elapsedRef.current / 45) * 100));
        } else if (data.status === 'completed') {
          setStatus('completed');
          setProgress(100);
          clearInterval(pollRef.current);
        } else if (data.status === 'failed') {
          setStatus('failed');
          setError(data.error || 'Processing failed.');
          clearInterval(pollRef.current);
        }
      } catch {
        // network hiccup — keep polling
      }
    }, 2000);
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
    upload(e.dataTransfer.files[0]);
  }, []);

  const reset = () => {
    clearInterval(pollRef.current);
    setStatus('idle');
    setProgress(0);
    setJobData(null);
    setError(null);
    elapsedRef.current = 0;
  };

  const statusLabel = {
    waking: 'Waking up server — free tier cold start, takes ~30s...',
    uploading: 'Uploading video...',
    queued: 'Queued — waiting for worker...',
    processing: 'Stabilizing — SIFT matching · Gaussian smoothing · warpAffine...',
  };

  const statusPercent = {
    waking: 5,
    uploading: 15,
    queued: 25,
    processing: progress,
  };

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
            <p>Upload a shaky cricket clip — get a stabilized video back</p>
          </div>
          <button className="stabilizer-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Idle — drop zone */}
        {status === 'idle' && (
          <div
            className={`stabilizer-drop-zone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current.click()}
          >
            <div className="stabilizer-drop-icon">🎬</div>
            <p>Drop your video here</p>
            <span>or click to browse</span>
            <p className="stabilizer-hint">MP4 · AVI · MOV &nbsp;·&nbsp; Short clips work best on free hosting</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/avi,video/quicktime,video/x-msvideo"
              onChange={(e) => upload(e.target.files[0])}
              hidden
            />
          </div>
        )}

        {/* Error shown under drop zone */}
        {error && status === 'idle' && (
          <p className="stabilizer-error-inline">{error}</p>
        )}

        {/* Processing */}
        {['waking', 'uploading', 'queued', 'processing'].includes(status) && (
          <div className="stabilizer-processing">
            <div className="stabilizer-spinner" />
            <p className="stabilizer-status-text">{statusLabel[status]}</p>
            <div className="stabilizer-progress-bar">
              <div
                className="stabilizer-progress-fill"
                style={{ width: `${statusPercent[status]}%` }}
              />
            </div>
            <p className="stabilizer-progress-label">{Math.round(statusPercent[status])}%</p>
          </div>
        )}

        {/* Completed */}
        {status === 'completed' && jobData && (
          <div className="stabilizer-result">
            <div className="stabilizer-result-header">
              <span className="stabilizer-success-badge">✓ Stabilization complete</span>
              <button
                className="btn btn-outline"
                onClick={reset}
                style={{ fontSize: '0.85rem', padding: '6px 18px', minHeight: 'unset' }}
              >
                Try another
              </button>
            </div>
            <div className="stabilizer-videos">
              <div className="stabilizer-video-block">
                <label>Original</label>
                <video
                  ref={originalVideoRef}
                  controls
                  src={`${API_BASE}/api/v1/video/raw/${jobData.input_video}`}
                />
              </div>
              <div className="stabilizer-video-block">
                <label>Stabilized</label>
                <video
                  ref={stabilizedVideoRef}
                  controls
                  src={`${API_BASE}/api/v1/video/processed/${jobData.output_video}`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Failed */}
        {status === 'failed' && (
          <div className="stabilizer-failed">
            <p>❌ {error || 'Something went wrong.'}</p>
            <button className="btn btn-primary" onClick={reset}>Try again</button>
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
