export function WaveDivider({ flip = false }: { flip?: boolean }) {
  // Each instance needs unique IDs to avoid SVG gradient conflicts
  const id = flip ? "b" : "a";

  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px]"
      >
        <defs>
          <linearGradient id={`waveGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-tertiary)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Back wave — slow drift */}
        <path fill={`url(#waveGrad-${id})`} opacity="0.4">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,80 C200,40 400,100 600,60 C800,20 1000,90 1200,50 L1200,120 L0,120 Z;
              M0,60 C180,95 420,30 600,70 C780,110 980,35 1200,65 L1200,120 L0,120 Z;
              M0,75 C220,35 380,105 600,55 C820,15 1020,85 1200,55 L1200,120 L0,120 Z;
              M0,80 C200,40 400,100 600,60 C800,20 1000,90 1200,50 L1200,120 L0,120 Z
            "
          />
        </path>

        {/* Middle wave — medium speed */}
        <path fill={`url(#waveGrad-${id})`} opacity="0.6">
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z;
              M0,70 C170,25 370,95 600,50 C830,5 1030,90 1200,70 L1200,120 L0,120 Z;
              M0,55 C190,105 330,10 600,65 C870,115 1070,15 1200,55 L1200,120 L0,120 Z;
              M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z
            "
          />
        </path>

        {/* Front wave — faster, more visible */}
        <path fill={`url(#waveGrad-${id})`} opacity="0.3">
          <animate
            attributeName="d"
            dur="4.5s"
            repeatCount="indefinite"
            values="
              M0,90 C250,50 450,110 650,70 C850,30 1000,100 1200,80 L1200,120 L0,120 Z;
              M0,75 C200,105 400,45 650,85 C900,55 1050,95 1200,70 L1200,120 L0,120 Z;
              M0,85 C230,55 470,105 650,65 C830,35 1020,100 1200,85 L1200,120 L0,120 Z;
              M0,90 C250,50 450,110 650,70 C850,30 1000,100 1200,80 L1200,120 L0,120 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}
