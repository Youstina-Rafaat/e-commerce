export interface ProductTabsProps  {
  description: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  sold?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
};

export type TabId = "details" | "reviews" | "shipping";