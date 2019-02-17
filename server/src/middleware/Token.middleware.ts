import crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const util = require('util');
import * as path from 'path';

const randomBytes = util.promisify(crypto.randomBytes);

const signJwt = util.promisify(jsonwebtoken.sign);

const RSA_PRIVATE_KEY = fs.readFileSync('./keys/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./keys/public.key');
// const RSA_PRIVATE_KEY = fs.readFileSync('../keys/private.key');
// const RSA_PUBLIC_KEY = fs.readFileSync('../keys/public.key');

const SESSION_DURATION = 1000;

exports.createSessionToken = async (user) => {
    return signJwt({
        roles: user.roles
    },
        RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 7200,
            subject: user.id.toString()
        });
}

exports.decodeJwt = async (token) => {
    const payload = await jsonwebtoken.verify(token, RSA_PUBLIC_KEY);    
    return payload;
}

exports.createCsrfToken = async () => {
    return await randomBytes(32).then(bytes => bytes.toString("hex"));
}