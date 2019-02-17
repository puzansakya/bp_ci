import { paged } from "./paged.model";

export interface ResponseWrapper<T> {    
    data?   : T[];
    paged?  : paged
}