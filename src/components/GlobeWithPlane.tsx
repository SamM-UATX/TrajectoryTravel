'use client';

export default function GlobeWithPlane() {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square animate-fade-in">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="globeFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0E1DD" />
            <stop offset="100%" stopColor="#c4c5c1" />
          </linearGradient>
          <filter id="planeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#415A77" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Globe */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="url(#globeFill)"
          stroke="#415A77"
          strokeWidth="2.5"
        />

        {/* Latitude lines */}
        {[-50, -25, 0, 25, 50].map((lat, i) => {
          const y = 200 + (lat / 90) * 130;
          const visibleRadius = Math.sqrt(150 * 150 - Math.pow(y - 200, 2));
          return (
            <ellipse
              key={`lat-${i}`}
              cx="200"
              cy={y}
              rx={visibleRadius}
              ry={visibleRadius * 0.08}
              fill="none"
              stroke="#415A77"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
          );
        })}

        {/* Longitude lines - curved meridians */}
        {[0, 45, 90, 135, 180].map((lon, i) => {
          const angle = (lon * Math.PI) / 180;
          const cx = 200 + 120 * Math.cos(angle);
          const path = `M 200 50 C ${cx} 200 ${cx} 200 200 350`;
          return (
            <path
              key={`lon-${i}`}
              d={path}
              fill="none"
              stroke="#415A77"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
          );
        })}

        {/* Dashed flight path arc */}
        <path
          d="M 30 200 Q 200 50 370 200"
          fill="none"
          stroke="#415A77"
          strokeWidth="2"
          strokeDasharray="8 6"
          strokeOpacity="0.5"
        />

        {/* Plane - flying along the arc */}
        <g filter="url(#planeShadow)">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M 30 200 Q 200 50 370 200"
          />
          <g transform="translate(-24, -14) rotate(-20)">
            <path
              d="M 0 14 L 50 14 L 56 10 L 60 14 L 56 18 L 50 14"
              fill="#415A77"
              stroke="#2d3d54"
              strokeWidth="1.5"
            />
            <path
              d="M 0 10 L 10 4 L 10 16 L 0 14 Z"
              fill="#415A77"
              stroke="#2d3d54"
              strokeWidth="1"
            />
            <path
              d="M 25 14 L 18 26 L 32 26 Z"
              fill="#5a7a9e"
              stroke="#415A77"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
