import { Model } from 'objection';

export default class Category extends Model {
    
    id              : number;
    category        : string;    

    static get tableName() {
        return 'categories';
    }    

};


