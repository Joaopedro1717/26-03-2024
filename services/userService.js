// .services/userService.js
class userService{
    //construtor da classe recebe a user model
    constructor(userModel) {
        this.User = userModel;
    }

    async create(nome, email, senha){

        try {
            const novoUser = await this.User.create(
                {
                    nome:nome,
                    email:email,
                    senha:senha
                }
            );
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
}

module.exports = userService;