import { Model } from 'objection';

export default class Clap extends Model {

    id          : number;
    user_id     : number;
    article_id  : number;

    static get tableName() {
        return 'claps';
    }
};


