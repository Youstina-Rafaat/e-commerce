
import { PageLoaderProps, sizes ,colors  } from "@/api/types/pageLoader.type";


const DOTS = 8;

export default function PageLoader({
  text,
  subtext,
  color = "green",
  circle = false,
  size = "lg",
}: PageLoaderProps) {
  const c = colors[color];
  const s = sizes[size];

  const spinner = (
    <span
      aria-hidden
      className={`relative inline-block animate-[spin_1s_steps(8,end)_infinite] ${s.box} ${
        size === "lg" ? c.text : "" 
      }`}
    >
      {Array.from({ length: DOTS }).map((_, i) => (
        <span
          key={i}
          className={`absolute start-1/2 top-1/2 rounded-full bg-current ${s.dot}`}
          style={{
            transform: `rotate(${i * (360 / DOTS)}deg) translateY(-${s.radius}px)`,
            opacity: 0.2 + (i / DOTS) * 0.8,
          }}
        />
      ))}
    </span>
  );

  if (size === "sm") return spinner;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center"
    >
      <div
        className={`flex items-center justify-center rounded-full ${
          circle ? `h-28 w-28 ${c.circle}` : "h-16 w-16"
        }`}
      >
        {spinner}
      </div>

      {text && <p className="mt-6 text-lg font-medium text-gray-700">{text}</p>}
      {subtext && <p className="mt-1 text-gray-400">{subtext}</p>}
    </div>
  );
}