import { Model } from 'objection';
import User from './User';

export default class Role extends Model {
    id: number;
    role: string;

    static get tableName() {
        return 'roles';
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "roles.id",
                    through: {
                        from: "user_roles.role_id",
                        to: "user_roles.user_id"
                    },
                    to: "users.id"
                }
            }
        };
    }

}

