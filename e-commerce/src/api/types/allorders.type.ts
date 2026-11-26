export interface OrderItem  {
  _id: string;
  count: number;
  price: number;
  product: { title: string; imageCover: string };
};

export interface Order  {
  _id: string;
  id: number;
  cartItems: OrderItem[];
  shippingAddress?: { details: string; phone: string; city: string };
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
};