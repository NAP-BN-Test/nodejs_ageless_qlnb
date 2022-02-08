const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mtblCustomer = require('../tables/financemanage/tblCustomer')
var database = require('../database');
var mtblReceiptsPayment = require('../tables/financemanage/tblReceiptsPayment')
var mtblInvoice = require('../tables/financemanage/tblInvoice')
var ctlPMCM = require('../controller_finance/ctl-apiSpecializedSoftware')

async function deleteRelationshiptblCustomer(db, listID) {
    await mtblCustomer(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}


async function calculateTheTotalAmountOfEachCurrency(db, array) {
    let arrayResult = []
    let arrayCheck = []
    for (let i = 0; i < array.length; i++) {
        let check = await mtblInvoice(db).findOne({
            where: { IDSpecializedSoftware: array[i].id }
        })
        if (check) {
            if (check.Status == 'Chờ thanh toán') {
                for (let j = 0; j < array[i].arrayMoney.length; j++) {
                    if (!checkDuplicate(arrayCheck, array[i].arrayMoney[j].typeMoney)) {
                        arrayCheck.push(array[i].arrayMoney[j].typeMoney)
                        arrayResult.push({
                            total: Number(array[i].arrayMoney[j].total),
                            typeMoney: array[i].arrayMoney[j].typeMoney,
                            date: array[i].createdDate,
                        })
                    } else {
                        arrayResult.forEach(element => {
                            if (element.typeMoney == array[i].arrayMoney[j].typeMoney) {
                                element.total += Number(array[i].arrayMoney[j].total)
                            }
                        })
                    }
                }
            }
        } else {
            if (array[i].statusName == 'Chờ thanh toán') {
                for (let j = 0; j < array[i].arrayMoney.length; j++) {
                    if (!checkDuplicate(arrayCheck, array[i].arrayMoney[j].typeMoney)) {
                        arrayCheck.push(array[i].arrayMoney[j].typeMoney)
                        arrayResult.push({
                            total: Number(array[i].arrayMoney[j].total),
                            typeMoney: array[i].arrayMoney[j].typeMoney,
                            date: array[i].createdDate,
                        })
                    } else {
                        arrayResult.forEach(element => {
                            if (element.typeMoney == array[i].arrayMoney[j].typeMoney) {
                                element.total += Number(array[i].arrayMoney[j].total)
                            }
                        })
                    }
                }
            }
        }


    }
    return arrayResult
}
function checkDuplicate(array, elm) {
    var check = false;
    array.forEach(item => {
        if (item === elm) check = true;
    })
    return check;
}
async function calculateTheTotalForCredit(db, array) {
    let arrayResult = []
    let total = 0
    for (let i = 0; i < array.length; i++) {
        let check = await mtblInvoice(db).findOne({
            where: { IDSpecializedSoftware: dataCredit[i].id }
        })
        if (check) {
            if (check.Status == 'Chờ thanh toán') {
                total += Number(array[i].total)
            }
        }
        else
            if (array[i].statusName == 'Chờ thanh toán')
                total += Number(array[i].total)
    }
    arrayResult.push({
        typeMoney: 'VND',
        total: total
    })
    return arrayResult
}
const axios = require('axios');
module.exports = {
    deleteRelationshiptblCustomer,
    // add_tbl_customer
    addtblCustomer: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblCustomer(db).create({
                        IDSpecializedSoftware: body.idSpecializedSoftware ? body.idSpecializedSoftware : null,
                        AmountUnspecified: body.amountUnspecified ? body.amountUnspecified : null,
                        AmountSpent: body.amountSpent ? body.amountSpent : null,
                        AmountReceivable: body.amountReceivable ? body.amountReceivable : null,
                    }).then(data => {
                        var result = {
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
                        }
                        res.json(result);
                    })
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // update_tbl_customer
    updatetblCustomer: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.idSpecializedSoftware || body.idSpecializedSoftware === '') {
                        if (body.idSpecializedSoftware === '')
                            update.push({ key: 'IDSpecializedSoftware', value: null });
                        else
                            update.push({ key: 'IDSpecializedSoftware', value: body.idSpecializedSoftware });
                    }
                    if (body.amountUnspecified || body.amountUnspecified === '') {
                        if (body.amountUnspecified === '')
                            update.push({ key: 'AmountUnspecified', value: null });
                        else
                            update.push({ key: 'AmountUnspecified', value: body.amountUnspecified });
                    }
                    if (body.amountSpent || body.amountSpent === '') {
                        if (body.amountSpent === '')
                            update.push({ key: 'AmountSpent', value: null });
                        else
                            update.push({ key: 'AmountSpent', value: body.amountSpent });
                    }
                    if (body.amountReceivable || body.amountReceivable === '') {
                        if (body.amountReceivable === '')
                            update.push({ key: 'AmountReceivable', value: null });
                        else
                            update.push({ key: 'AmountReceivable', value: body.amountReceivable });
                    }
                    database.updateTable(update, mtblCustomer(db), body.id).then(response => {
                        if (response == 1) {
                            res.json(Result.ACTION_SUCCESS);
                        } else {
                            res.json(Result.SYS_ERROR_RESULT);
                        }
                    })
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // delete_tbl_customer
    deletetblCustomer: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = JSON.parse(body.listID);
                    await deleteRelationshiptblCustomer(db, listID);
                    var result = {
                        status: Constant.STATUS.SUCCESS,
                        message: Constant.MESSAGE.ACTION_SUCCESS,
                    }
                    res.json(result);
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // get_list_tbl_customer
    getListtblCustomer: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let dataCustomer = await ctlPMCM.getCustomerOfPMCM(body.page ? body.page : 1, body.itemPerPage ? body.itemPerPage : 100000000)
                    let stt = 1;
                    let arrayCredit = []
                    let arrayInvoice = []
                    let arrayResult = []
                    for (let cus of dataCustomer.data) {
                        var obj = {
                            stt: stt,
                            id: Number(cus.id),
                            name: cus.name ? cus.name : '',
                            code: cus.code ? cus.code : '',
                            address: cus.address ? cus.address : '',
                            idSpecializedSoftware: Number(cus.id),
                            amountUnspecified: [{ total: 1, typeMoney: 'VND' }, { total: 0, typeMoney: 'USD' }],
                            amountSpent: arrayCredit,
                            amountReceivable: arrayInvoice,
                        }
                        arrayResult.push(obj);
                        stt += 1;
                    }
                    var result = {
                        array: arrayResult,
                        status: Constant.STATUS.SUCCESS,
                        message: Constant.MESSAGE.ACTION_SUCCESS,
                        all: dataCustomer.count
                    }
                    res.json(result);
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // get_list_tbl_customer_debt
    getListtblCustomerDebt: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    // await axios.get(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/address_book/partners_share`).then(async data => {
                    //     if (data) {
                    let dataCustomer = ctlPMCM.getCustomerSpecializeSoftware()
                    // var array = data.data.data;
                    var array = dataCustomer;
                    var arrayResult = [];
                    var stt = 1;
                    let arrayInvoice = []
                    let arrayCredit = []
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].id == 1) {
                            arrayInvoice = await calculateTheTotalAmountOfEachCurrency(db, data)
                            arrayCredit = await calculateTheTotalForCredit(db, dataCredit)
                        } else {
                            arrayInvoice = [
                                {
                                    typeMoney: 'VND',
                                    total: 0
                                }]
                            arrayCredit = [
                                {
                                    typeMoney: 'VND',
                                    total: 0
                                }]
                        }
                        var cus = await mtblCustomer(db).findOne({
                            where: {
                                IDSpecializedSoftware: array[i].id
                            }
                        })
                        if (!cus) {
                            await mtblCustomer(db).create({
                                IDSpecializedSoftware: array[i].id ? array[i].id : null,
                                AmountUnspecified: 0,
                                AmountSpent: 0,
                                AmountReceivable: 0,
                            })
                        }
                        let totalInv = 0;
                        let totalUndefind = 0;
                        let totalCredit = 0;
                        await mtblCustomer(db).findOne({
                            where: { IDSpecializedSoftware: array[i].id },
                        }).then(async data => {
                            for (var inv = 0; inv < data.length; inv++) {
                                if (data[inv].idCustomer == array[i].id) {
                                    totalInv += Number(data[inv].total)
                                }
                            }
                            for (var cre = 0; cre < dataCredit.length; cre++) {
                                if (dataCredit[cre].idCustomer == array[i].id) {
                                    totalCredit += Number(dataCredit[cre].total)
                                }
                            }
                            await mtblReceiptsPayment(db).findAll({
                                where: {
                                    IDCustomer: array[i].id,
                                    UnpaidAmount: { [Op.ne]: 0 },
                                }
                            }).then(data => {
                                data.forEach(item => {
                                    totalUndefind += Number(item.Amount);
                                })
                            })
                            console.log(arrayInvoice);
                            var obj = {
                                stt: stt,
                                id: Number(data.IDSpecializedSoftware),
                                name: array[i].name ? array[i].name : '',
                                code: array[i].customerCode ? array[i].customerCode : '',
                                address: array[i].address ? array[i].address : '',
                                idSpecializedSoftware: data.IDSpecializedSoftware ? data.IDSpecializedSoftware : 0,
                                amountUnspecified: [{ total: totalUndefind, typeMoney: 'VND' }, { total: 0, typeMoney: 'USD' }],
                                amountSpent: arrayCredit,
                                amountReceivable: arrayInvoice,
                            }
                            let checkCredit = false
                            arrayCredit.forEach(item => {
                                if (item.total != 0)
                                    checkCredit = true
                            })
                            let checkInvoice = false
                            arrayInvoice.forEach(item => {
                                if (item.total != 0)
                                    checkInvoice = true
                            })
                            if (totalUndefind != 0 || checkCredit == true || checkInvoice == true)
                                arrayResult.push(obj);
                            stt += 1;
                        })
                    }
                    var count = await mtblCustomer(db).count()
                    var result = {
                        array: arrayResult,
                        status: Constant.STATUS.SUCCESS,
                        message: Constant.MESSAGE.ACTION_SUCCESS,
                        all: count
                    }
                    res.json(result);
                    //     }
                    //     else {
                    //         res.json(Result.SYS_ERROR_RESULT)
                    //     }
                    //     // console.log(data.data);
                    // })
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // get_list_name_tbl_customer
    getListNametblCustomer: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblCustomer(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                idSpecializedSoftware: element.IDSpecializedSoftware ? element.IDSpecializedSoftware : '',
                            }
                            array.push(obj);
                        });
                        var result = {
                            array: array,
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
                        }
                        res.json(result);
                    })

                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    }
}