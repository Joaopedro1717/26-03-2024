// /.auth/authService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    async authUser(user, senha) {
        try {
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            return isPasswordValid;
        } catch (error) {
            throw new Error('Senha incorreta');
        }
    }

    async generatorToken(user) {
        try {
            const token = jwt.sign({ userId: user.id }, 'seu_secreto_jwt', { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.log(error);
        }
    }

    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, 'seu_secreto_jwt');

            return decoded;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

    async authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        try {
                const decoded = jwt.verify(token, 'seu_secreto_jwt');
            req.user = decoded; // Armazena os dados do usuário decodificados na requisição
            
            next(); // Chama a próxima função de middleware
        } catch (error) {
            return res.status(403).json({ message: 'Falha na autenticação' });
        }
    }
}

module.exports = AuthService;
