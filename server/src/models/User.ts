import { Model } from 'objection';
import Role from './Role';

export default class User extends Model {

    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    username: string;
    email: string;
    bio: string;
    password_digest: string;
    create_at: Date;
    modified_date: Date;
    roles: Role[];

    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Role,
                join: {
                    from: "users.id",
                    through: {
                        from: "user_roles.user_id",
                        to: "user_roles.role_id"
                    },
                    to: "roles.id"
                }
            }
        };
    }

}






