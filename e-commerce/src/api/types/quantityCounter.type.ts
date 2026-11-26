export interface Props  {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};