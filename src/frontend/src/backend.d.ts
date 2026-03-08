import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    priceInInr: bigint;
    description: string;
    imageUrl: string;
    category: ProductCategory;
}
export type Time = bigint;
export interface OrderItem {
    productId: bigint;
    quantity: bigint;
}
export interface CustomerInfo {
    name: string;
    address: string;
    phone: string;
}
export interface Enquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Order {
    id: bigint;
    customerInfo: CustomerInfo;
    timestamp: Time;
    items: Array<OrderItem>;
}
export interface UserProfile {
    name: string;
    address: string;
    phone: string;
}
export enum ProductCategory {
    customisation = "customisation",
    consumerElectronics = "consumerElectronics",
    laserEngraving = "laserEngraving",
    threeDPrinting = "threeDPrinting"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, priceInInr: bigint, imageUrl: string, category: ProductCategory): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllCategories(): Promise<Array<ProductCategory>>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProductById(id: bigint): Promise<Product | null>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initSampleProducts(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(items: Array<OrderItem>, customerInfo: CustomerInfo): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitEnquiry(name: string, phone: string, email: string, message: string): Promise<bigint>;
}
