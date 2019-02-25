import { Model } from 'objection';
import User from './User';
import Clap from './Clap';
import Bookmark from './Bookmark';

export default class Article extends Model {

    id: number;
    heading: string;
    slug: string;
    description: string;
    content: string;
    backdrop: string;
    created_date: Date;
    modified_date: Date;
    status: boolean;
    user_id: number;
    category_id: number;

    static get tableName() {
        return 'articles';
    }

    static get relationMappings() {
        return {
            user: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'articles.user_id',
                    to: 'users.id'
                }
            },
            claps: {
                modelClass: Clap,
                relation: Model.HasManyRelation,
                join: {
                    from: 'articles.id',
                    to: 'claps.article_id'
                }
            },
            bookmarks: {
                modelClass: Bookmark,
                relation: Model.HasManyRelation,
                join: {
                    from: 'articles.id',
                    to: 'bookmarks.article_id'
                }
            },
        };
    }
};


