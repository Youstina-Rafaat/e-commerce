import { ReactNode } from "react";

export interface LoadingBannerProps  {
  color?: "green" | "purple";
  breadcrumb: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
};