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
var suppliersRouter = require('./routes/suppliers');
var proposalsRouter = require('./routes/proposals');
var billToPayRouter = require('./routes/billToPay');

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
app.use('/suppliers', suppliersRouter);
app.use('/proposals', proposalsRouter);
app.use('/billsToPay', billToPayRouter);
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
        db.Department.belongsTo(db.CostCenter, { foreignKey: 'costCenterId', as: 'costCenter' });
        
        //Associação Usuário Departamento
        db.Department.hasMany(db.User, { foreignKey: 'departmentId', as: 'users' });
        db.User.belongsTo(db.Department, { foreignKey: 'departmentId', as: 'department' });

        //Associação Proposta Comprador, Produtos, Fornecedores e o valor da proposta
        db.User.hasMany(db.Proposal, { foreignKey: 'buyer' });
        db.Proposal.belongsTo(db.User, { foreignKey: 'buyer' });
        db.Product.hasMany(db.Proposal, { foreignKey: 'productId' });
        db.Proposal.belongsTo(db.Product, { foreignKey: 'productId', as: 'Product' });
        db.Supplier.hasMany(db.Proposal, { foreignKey: 'supplierId', as: 'Supplier' });
        db.Proposal.belongsTo(db.Supplier, { foreignKey: 'supplierId', as: 'Supplier' });
        db.Proposal.hasMany(db.Purchase, { foreignKey: 'proposalId', as: 'Proposal' });
        db.Purchase.belongsTo(db.Proposal, { foreignKey: 'proposalId' });

        
        //Associação Compras Fornecedores, propostas, compradores, produtos e contas a pagar
        db.Supplier.hasMany(db.Purchase, { foreignKey: 'supplierId', as: 'SupplierPurchase' });
        db.Purchase.belongsTo(db.Supplier, { foreignKey: 'supplierId' });
        db.User.hasMany(db.Purchase, { foreignKey: 'buyerId' });
        db.Purchase.belongsTo(db.User, { foreignKey: 'buyerId' });
        db.Product.hasMany(db.Purchase, { foreignKey: "productId" });
        db.Purchase.belongsTo(db.Product, { foreignKey: 'productId' });

        //Associação Compras Contas a pagar
        db.BillToPay.hasMany(db.MovementBillToPay, { foreignKey: 'titleId', as: 'MovementBillToPay'});
        db.MovementBillToPay.belongsTo(db.BillToPay, { foreignKey: 'titleId', as: 'BillToPay'});
        db.Purchase.hasMany(db.BillToPay, { foreignKey: 'purchaseId', as: 'BillToPay'});
        db.BillToPay.belongsTo(db.Purchase, { foreignKey: 'purchaseId', as: 'Purchase'});
        
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
