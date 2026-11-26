import { ProductType } from "@/api/types/product.type";
import { SubCategoryType } from "@/api/types/subcategory.type";

export async function getCategorySubcategories(id: string): Promise<SubCategoryType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    const data = await res.json();
    return data.data;
  } catch {
    return undefined;
  }
}

export async function getSingleSubcategory(id: string): Promise<SubCategoryType | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
    const data = await res.json();
    return data.data;
  } catch {
    return undefined;
  }
}

export async function getProductsBySubcategory(id: string): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory=${id}`);
    const data = await res.json();
    return data.data;
  } catch {
    return undefined;
  }
}