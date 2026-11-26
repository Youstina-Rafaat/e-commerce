export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubcategoryType {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductType {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand: BrandType;
  category: CategoryType;
  subcategory: SubcategoryType[];
  createdAt: string;
  updatedAt: string;
  priceAfterDiscount?:number;
  availableColors?:string[],
}