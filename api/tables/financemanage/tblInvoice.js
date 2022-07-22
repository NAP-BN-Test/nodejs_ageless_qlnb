const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblInvoice', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        IDSpecializedSoftware: Sequelize.INTEGER,
        Payments: Sequelize.STRING,
        PayDate: Sequelize.DATE,
        PaidAmount: Sequelize.FLOAT,
        TotalCqnn: Sequelize.FLOAT,
        IsInvoice: Sequelize.BOOLEAN,
        IDCqnn: Sequelize.INTEGER,
    });
    return table;
}