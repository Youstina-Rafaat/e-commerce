import { BrandType, ProductType } from "@/api/types/product.type";

export async function getAllBrands(): Promise<BrandType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
    const data = await res.json();
    return data.data;
  } catch {
    return undefined;
  }
}

export async function getSingleBrand(id: string): Promise<BrandType | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    const data = await res.json();
    return data.data;
  } catch {
    return undefined;
  }
}

export async function getProductsByBrand(id: string): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
    const data = await res.json();
    return data.data;
  } catch {
    return undefined;
  }
}