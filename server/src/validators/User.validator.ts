import * as joi from "joi";

export const UserObject = {
    id: joi.object().keys({
        id: joi.number()
    }),
    body: joi.object().keys({
        email: joi.string().email({ minDomainAtoms: 2 }),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    })
}

