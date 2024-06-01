var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var depositsRouter = require('./routes/deposits');
var moveProductsRouter = require('./routes/moveProducts');
var departmentsRouter = require('./routes/departments');

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
app.use('/moveProducts', moveProductsRouter);
app.use('/departments', departmentsRouter);
const db = require('./models');

// Aplicar as migration (integrar com o banco de dados [MySql])

// Função para controlar a sincronização com o banco de dados
async function ApplyMigrations(){
    try {
        migration_config={
            create: true,
            alter:true
        };
        //Associação Movimentação productos 
        db.Deposit.hasMany(db.MoveProduct, { foreignKey: 'depositId' });
        db.Product.hasMany(db.MoveProduct, { foreignKey: 'productId' });
        db.MoveProduct.belongsTo(db.Deposit, { foreignKey: 'depositId' });
        db.MoveProduct.belongsTo(db.Product, { foreignKey: 'productId' });

        //Associação Departamentos e Centro de custos
        db.CostCenter.hasOne(db.Department, { foreignKey: 'costCenterId', as: "department" });
        db.Department.belongsTo(db.CostCenter, { foreignKey: 'costCenterId', as: 'costCenter'});
        
        //Associação Usuário Departamento
        db.Department.hasMany(db.User, { foreignKey: 'departmentId', as: 'users'});
        db.User.belongsTo(db.Department, { foreignKey: 'departmentId', as: 'department'});

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
