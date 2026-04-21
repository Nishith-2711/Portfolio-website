import useTilt from '../hooks/useTilt';

const TiltCard = ({ children, className, style, tiltOptions = {} }) => {
  const { cardRef, glareRef, handleMouseMove, handleMouseLeave } = useTilt(tiltOptions);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transition: 'transform 0.18s ease-out, box-shadow 0.35s ease, border-color 0.35s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 30,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {children}
    </div>
  );
};

export default TiltCard;
