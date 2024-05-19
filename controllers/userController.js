// .controllers/userController.js

class userController{
    constructor(userService){
        this.userService = userService;

    }

    async create(req, res, next){
        const {nome, email, senha} = req.body;
        try {
            const novoUser = await this.userService.create(nome, email, senha);

            res.status(200).json(novoUser);

        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Erro ao inserir o novo usuário.'});
        }
    }

    async localizaTodosUsuarios(req, res) {

        try {
            const allUsers = await this.userService.localizaTodosUsuarios();
            res.status(200).json(allUsers);

        } catch (error) {
            res.status(400).json({error:'Não foi possível localizar todos os usuários.'});
        }       
    }

    async localizaUsuarioPeloId(req, res) {
        const {id} = req.body

        try {
            const idUser = await this.userService.localizaUsuarioPeloId(id);
            res.status(200).json(idUser);

        } catch (error) {
            res.status(400).json({error:'Usuário não encontrado.'})
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const token = await this.userService.login(email, senha);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}
module.exports = userController;