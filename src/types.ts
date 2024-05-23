export interface Product {
    id: number;
    name: string;
    id_category: number;
    description: string;
    price: number;
    stock_quantity: number;
    activated: boolean;
    image_thumbnail_name: string;
}

export interface Category {
    id: number;
    name: string;
    url_name: string;
    discount: number;
}
