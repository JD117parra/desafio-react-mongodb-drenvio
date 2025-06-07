export interface Producto {
    _id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    description?: string;
    brand?: string;
    sku: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface PrecioEspecial {
    _id?: string;
    userId: string;
    userName: string;
    productId: string;
    specialPrice: number;
    createdAt?: string;
}