export default function SleepingCat({ className = "" }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className="breathing">
        <svg viewBox="0 0 180 110" className="h-28 w-40 text-moss drop-shadow-sm">
          <ellipse cx="95" cy="93" rx="72" ry="9" fill="currentColor" opacity="0.14" />
          <path
            d="M40 44 L35 22 L52 40 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M68 42 L76 22 L82 42 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="56" cy="63" r="24" fill="currentColor" />
          <ellipse cx="104" cy="72" rx="58" ry="26" fill="currentColor" />
          <path
            d="M158 76 C158 76 152 98 122 96 C104 95 88 92 74 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path d="M43 42 L40 30 L49 40 Z" fill="#EDEAE3" />
          <path d="M70 41 L76 30 L80 41 Z" fill="#EDEAE3" />
          <path
            d="M44 67 q6 -4 12 0"
            fill="none"
            stroke="#EDEAE3"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M60 67 q6 -4 12 0"
            fill="none"
            stroke="#EDEAE3"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M56 70 l-3.5 3.2 l3.5 3.4 l3.5 -3.4 Z"
            fill="#EDEAE3"
            opacity="0.85"
          />
        </svg>
      </div>
    </div>
  );
}
