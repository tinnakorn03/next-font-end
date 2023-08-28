export interface Product {
    product_id?: string;
    product_name: string;
    description: string;
    quantity: number;
    price: number;
    image?: string | ImageDetail; 
};

export interface Product {
    addItem?: number;
    isDelete?:boolean; 
}
 
export interface ImageDetail {
    name: string;
    lastModified: number;
    lastModifiedDate: string;
    webkitRelativePath: string;
    size: number;
    type: string;
}
 