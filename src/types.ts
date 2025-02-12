import { BaseElement, Descendant, Element as SlateElement } from "slate";

export interface Product {
    id: number;
    name: string;
    id_category: number;
    description: string;
    price: number;
    stock_quantity: number;
    activated: boolean;
    image_thumbnail_name: string;
    publication_date: string;
}

export interface Category {
    id: number;
    name: string;
    url_name: string;
    discount: number;
}

// RichEditor Element
export interface CustomElement extends BaseElement {
    type:
        | "paragraph"
        | "heading-one"
        | "list-item"
        | "numbered-list"
        | "bulleted-list";
    children: Descendant[]; // Aqui Descendant inclui tanto texto quanto elementos
}

// RichEditor Text
export interface CustomText {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}

export interface SoldProduct {
    id: number;
    product_id: number;
    quantity_sold: number;
    sale_price: number;
    sale_date: string; // ISO date string
}

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
    active: boolean;
    access_role: number;
}
