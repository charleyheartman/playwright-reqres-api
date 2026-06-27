export type ProductData = {
    name?: string;
    price?: number;
    category?: string;
    in_stock?: boolean;
};

export const validProduct: ProductData = {
    name: 'Wireless Headphones',
    price: 59.99,
    category: 'Electronics',
    in_stock: true
};

export const notValidProduct: ProductData = {
    price: -9999999,
    category: 'Electronics',
    in_stock: false
};

export const emptyProduct: ProductData = {};