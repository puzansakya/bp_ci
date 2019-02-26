import { User } from "./user.model";

export interface Article {
    id?             : number;
    heading?        : string;
    slug?           : string;
    content?        : string;
    description?    : string;
    backdrop?       : string;
    status?         : string;
    created_at?     : string;
    bookmarked?     : boolean;
    // category?   : string;
    // author?: string;
    // avatar?: string;
    user?           : User;
    category_id?    : string;
}