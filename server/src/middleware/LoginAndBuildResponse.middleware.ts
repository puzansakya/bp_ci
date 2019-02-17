const crypt = require('crypto');
const token = require('./Token.middleware');
const hasher = require('./Hash.middleware');

exports.loginAndBuildResponse = async (credentials, user, res, next) => {
    try {

        const jwtToken = await this.attempLogin(credentials, user);

        //  const csrfToken = await token.createCsrfToken();        

        // res.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: true });
        // res.cookie("SESSIONID", sessionToken);

        // res.cookie("XSRF-TOKEN", csrfToken);

        res.status(200).json({ id: user.id, email: user.email, roles: user.roles, token: jwtToken });

    } catch (error) {        
        res.status(403).json({ message: 'Username and password does not match' });
    }
}

exports.attempLogin = async (credentials, user) => {    
    const passwordD = user.passwordDigest;
    const hash = await hasher.hash(credentials.password);
    const isPasswordValid = await (passwordD === hash);

    if (!isPasswordValid) {
        throw new Error("Password Invalid");
    }

    return token.createSessionToken(user);

}