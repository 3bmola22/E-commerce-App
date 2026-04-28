// ======================
// 1. Shared Types (Category, Brand, Subcategory)
// ======================
export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubCategoryType {
  _id: string;
  name: string;
  slug: string;
  category?: string | CategoryType;
}

// ======================
// 2. Product Types
// ======================
export interface ProductType {
  _id: string;
  id?: string;
  title: string;
  slug?: string;
  description?: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images?: string[];
  category: CategoryType | string;
  subcategory: SubCategoryType[];
  brand?: BrandType | string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  sold?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// ======================
// 3. Cart & Wishlist Shared Product
// ======================
export interface CartItemProduct extends ProductType {}
export interface WishlistProductType extends ProductType {}

// ======================
// 4. Cart Types
// ======================
export interface CartItem {
  count: number;
  _id: string;
  product: CartItemProduct;
  price: number;
}

export interface CartType {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// ======================
// 5. Order Types (اللي كنت عايزه بالذات)
// ======================
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderItem {
  count: number;
  _id: string;
  product: ProductType;
  price: number;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Order {
  _id: string;
  id?: string;
  user: OrderUser | string;
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "card" | "cash";
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  coupon?: string | null;
}

export type OrdersResponse = Order[];

// ======================
// 6. Wishlist Types
// ======================
export interface WishlistResponseType {
  status: string;
  count: number;
  data: WishlistProductType[];
}

export interface WishlistItemType {
  _id: string;
  product: WishlistProductType;
}

// ======================
// 7. API Response Types (Cart)
// ======================
export interface GetCartResponse {
  status: string;
  numOfCartItems: number;
  data: CartType;
}

export interface AddToCartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  data: CartType;
}

export interface UpdateCartResponse {
  status: string;
  numOfCartItems: number;
  data: CartType;
}

export interface RemoveFromCartResponse {
  status: string;
  numOfCartItems: number;
  data: CartType;
}

export interface ClearCartResponse {
  message: string;
}

// ======================
// 8. Helper Types
// ======================
export interface ProductId {
  productId: string;
}

export interface WishlistProductIdType {
  productId: string;
}
