export interface PageLoaderProps  {
  text?: string;
  subtext?: string;
  color?: "green" | "purple";
  circle?: boolean; 
  size?: "sm" | "lg"; 
};

export const colors = {
  green: { text: "text-green-600", circle: "bg-green-50" },
  purple: { text: "text-purple-600", circle: "bg-purple-50" },
};

export const sizes = {
  sm: { box: "h-5 w-5", dot: "-ms-[2px] -mt-[2px] h-1 w-1", radius: 8 },
  lg: { box: "h-12 w-12", dot: "-ms-[5px] -mt-[5px] h-2.5 w-2.5", radius: 20 },
};