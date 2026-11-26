import { ProductType } from "./product.type";

interface product {
  _id: string;
  count: number;
  price: number;
  product: ProductType
};


export interface CartData  {
    cartOwner:string;
    createdAt:string;
    products:product[];
    totalCartPrice:number;
    updatedAt:string;
    _id:string;
    __v:number
};