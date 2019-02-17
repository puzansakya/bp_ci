import { Article } from "./article.model";

export interface Articles {
    data?   : Article[];
    paged?  : paged
}

export interface paged {
    page?       : number;
    pageSize?   : number;
    rowCount?   : number;
    pageCount?  : number;
}