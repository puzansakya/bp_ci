import * as joi from "joi";

export const HotelObject = {
    id: joi.object().keys({
        id: joi.number()
    }),
    body: joi.object().keys({
        name            : joi.string(),
        description     : joi.string(),
        logo            : joi.string(),
        backdrop        : joi.string(),
        parking         : joi.boolean(),
        opening_time    : joi.string(),
        closing_time    : joi.string(),
        phone           : joi.string(),
        location        : joi.string(),
        lat             : joi.number(),
        lng             : joi.number(),
        created_date    : joi.date().timestamp(),
        modified_date   : joi.date().timestamp(),
        status          : joi.boolean(),
        customer_id     : joi.number(),
        hotel_id        : joi.number(),
        like            : joi.boolean(),
        fav             : joi.boolean(),
    })
}

