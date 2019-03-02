import { Article } from "./article.model";
import { paged } from "./paged.model";

export interface Articles {
    data?   : Article[];
    paged?  : paged
}
