import { Model } from 'objection';
import User from './User';
import Role from './Role';

export default class UserRole extends Model {


    static get tableName() {
        return 'user_roles';
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "user_roles.user_id",
                    to: "users.id"
                }
            },
            roles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Role,
                join: {
                    from: "user_roles.role_id",
                    to: "roles.id"
                }
            }
        };
    }
}
