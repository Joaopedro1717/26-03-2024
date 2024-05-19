var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var depositsRouter = require('./routes/deposits');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/deposits', depositsRouter);
const db = require('./models');

// Aplicar as migration (integrar com o banco de dados [MySql])

// Função para controlar a sincronização com o banco de dados
async function ApplyMigrations(){
    try {
        migration_config={
            create: true,
            alter:true
        };

        db.Deposit.hasMany(db.MovimentarProduto, { foreignKey: 'depositId' });
        db.Product.hasMany(db.MovimentarProduto, { foreignKey: 'productId' });
        db.MovimentarProduto.belongsTo(db.Deposit, { foreignKey: 'depositId' });
        db.MovimentarProduto.belongsTo(db.Product, { foreignKey: 'productId' });

        await db.sequelize.sync({
            alter: migration_config.alter
        });
        console.log('Sincronização com o banco realizada com sucesso');
    }
    catch(error){
        console.log('Erro sincronizando o banco de dados', error);
    }
}

// Acionar a sincronização com o banco de dados

 ApplyMigrations();

// Alterando para ouvir na porta 5000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
