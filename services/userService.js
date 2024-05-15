// .services/userService.js

const { all } = require("../routes");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthService = require("./authService");
const auth = new AuthService();
// const { authUser, generatorToken } = require("./authService");

class userService{
    //construtor da classe recebe a user model
    constructor(userModel) {
        this.User = userModel;
    }

    async create(nome, email, senha){

        try {
            const senhaCriptografada = await bcrypt.hashSync(senha, 10);
            const novoUser = await this.User.create(
                {
                    nome:nome,
                    email:email,
                    senha:senhaCriptografada
                }
            );
            novoUser.senha = '';
            return novoUser ? novoUser : null; //IF ternário
            // if(novoUser){
            // return novoUser;     <---- é a mesma coisa que um IF ternário
            // } else{
            // return null;
            // }
        }
        
        catch(error){
            throw error;
        }
    }
    //localizaUsuarioPeloLogin
    async localizaTodosUsuarios(){
        try {
            const AllUsers =  await this.User.findAll();
            return AllUsers ? AllUsers : null;
            
        } catch (error) {
            throw error;
        }
    }
    //localizaUsuarioPeloId
    async localizaUsuarioPeloId(userId){
        try {
            const IdUser = await this.User.findOne({where: {id: userId}});
            IdUser.senha = "";
            return IdUser? IdUser: null;
        } catch (error) {
            throw error;
        }
    }

    /*async login(email, senha) {

        try {

            const user = await User.findOne({ where: {email: email} 
            });

            if(!user) {
                throw new Error ('Usuário não encontrado');
            }

            const authPassword = await authUser(user, senha);
            if(!authPassword) {
                throw new Error ('Senha incorreta');
            }
   
        } catch (error) {
            
           
        }
    } */

    async login(email, senha) {
        try {
            // Localizar o usuário pelo e-mail
            const user = await this.User.findOne({ where: { email } });
    
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
    
            // Verificar se a senha está correta
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                throw new Error('Senha incorreta');
            }
    
            // Gerar token de acesso JWT
            const token = auth.generatorToken(user);
    
            return token;
        } catch (error) {
            throw error;
        }
    }
    


}



module.exports = userService;