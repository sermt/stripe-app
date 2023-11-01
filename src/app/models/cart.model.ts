export interface Cart {
    items: CartItem[];
}

export interface CartItem{
    productImage:string;
    name:string;
    price:number;
    quantity:number;
    id:number;
}