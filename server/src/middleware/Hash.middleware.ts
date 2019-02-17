import crypt = require('crypto');

exports.hash = async (password) => {    
    const hash = crypt.createHash('sha256').update(password).digest('hex');        
    return hash;
}