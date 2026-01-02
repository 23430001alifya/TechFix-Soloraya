interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Logo({ size = 'medium', className = '' }: LogoProps) {
  const sizeMap = {
    small: { container: 'w-8 h-8', text: 'text-sm' },
    medium: { container: 'w-10 h-10', text: 'text-base' },
    large: { container: 'w-16 h-16', text: 'text-2xl' }
  };

  const dimensions = sizeMap[size];

  return (
    <div className={`${dimensions.container} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
        </defs>
        
        {/* Main Circle */}
        <circle cx="50" cy="50" r="45" fill="url(#purpleGradient)" />
        
        {/* Wrench */}
        <path
          d="M35 30 L35 35 L30 35 L30 45 L35 45 L35 50 L40 50 L40 35 L35 35 Z"
          fill="white"
          opacity="0.9"
        />
        
        {/* Screwdriver */}
        <path
          d="M55 30 L60 30 L60 50 L55 50 Z M55 50 L52 55 L63 55 L60 50 Z"
          fill="white"
          opacity="0.9"
        />
        
        {/* Circuit Board Pattern */}
        <circle cx="70" cy="35" r="3" fill="white" opacity="0.6" />
        <circle cx="70" cy="45" r="3" fill="white" opacity="0.6" />
        <line x1="70" y1="38" x2="70" y2="42" stroke="white" strokeWidth="1.5" opacity="0.6" />
        
        {/* Letter T */}
        <text
          x="50"
          y="77"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          T
        </text>
      </svg>
    </div>
  );
}

export function LogoText({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="text-purple-600">TechFix</h1>
      <p className="text-xs text-gray-500">Soloraya</p>
    </div>
  );
}
