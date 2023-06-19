import { Item } from "./Item.types";

export type Transaction = {
    id: number;
    created_at: string;
    member_id: number;
    order_no: string;
    item: Item;
}