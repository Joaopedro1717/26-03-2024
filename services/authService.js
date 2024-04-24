// .services/authService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function authUser(user, senha) {
    try{
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    return isPasswordValid;
    }

    catch(error) {
        throw new Error('Senha incorreta');
    }
    
}

function generatorToken(user) {
    try {
        
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 'alimento');

        return token;
    
    } catch (error) {
        console.log(error);
    }
}

module.exports = {authUser, generatorToken};