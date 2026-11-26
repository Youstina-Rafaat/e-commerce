import { ReactNode } from "react";
export const colors = {
 green: "from-green-700 via-green-600 to-green-400",
  purple: "from-violet-700 via-violet-600 to-purple-400",
} as const;
export interface PageHeaderProps {
  icon: ReactNode;
  tag: { label: string; href?: string }[];
  title: string;
  description: string;
  color?: keyof typeof colors;
};