const axios = require('axios');
const Result = require('../constants/result');
const Constant = require('../constants/constant');
var mtblInvoice = require('../tables/financemanage/tblInvoice')
var mtblDMNhanvien = require('../tables/constants/tblDMNhanvien');
var mtblDMBoPhan = require('../tables/constants/tblDMBoPhan')
var mtblCurrency = require('../tables/financemanage/tblCurrency')
var mtblRate = require('../tables/financemanage/tblRate')
var moment = require('moment');
const Op = require('sequelize').Op;
var mtblReceiptsPayment = require('../tables/financemanage/tblReceiptsPayment')
var mtblPaymentRInvoice = require('../tables/financemanage/tblPaymentRInvoice')
var mtblInvoiceRCurrency = require('../tables/financemanage/tblInvoiceRCurrency')
var mtblDMUser = require('../tables/constants/tblDMUser');
var mtblDMChiNhanh = require('../tables/constants/tblDMChiNhanh')
var mtblDMTaiKhoanKeToan = require('../tables/financemanage/tblDMTaiKhoanKeToan')
var mtblCurrency = require('../tables/financemanage/tblCurrency')
var mtblRate = require('../tables/financemanage/tblRate')
// data model invoice của KH
var dataCredit = [{
    id: 100,
    createdDate: '01/05/2021',
    invoiceNumber: 'INV0001',
    statusName: 'Chờ thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0001',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: 'Yêu cầu Xóa',
    accountingDebt: '331',
    accountingCredit: '642',
    nameAccountingDebt: 'Phải trả người bán',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1000000',
        typeMoney: 'VND',
    },
    {
        total: '100',
        typeMoney: 'USD',
    },
    ],
},
{
    id: 102,
    createdDate: '01/05/2021',
    invoiceNumber: 'INV0002',
    statusName: 'Chờ thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0002',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: '',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1100000',
        typeMoney: 'VND',
    },
    {
        total: '110',
        typeMoney: 'USD',
    },
    ],
},
{
    id: 103,
    createdDate: '03/05/2021',
    invoiceNumber: 'INV0003',
    statusName: 'Đã thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0003',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: 'Yêu cầu xóa',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1200000',
        typeMoney: 'VND',
    },
    {
        total: '120',
        typeMoney: 'USD',
    },
    ],
},
{
    id: 104,
    createdDate: '04/05/2021',
    invoiceNumber: 'INV0004',
    statusName: 'Đã thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0004',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: 'Yêu cầu sửa',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1300000',
        typeMoney: 'VND',
    },],
},
{
    id: 105,
    createdDate: '05/05/2021',
    invoiceNumber: 'INV0005',
    statusName: 'Chờ thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0005',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: '',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1500000',
        typeMoney: 'VND',
    },
    {
        total: '150',
        typeMoney: 'USD',
    },
    ],
},
{
    id: 106,
    createdDate: '06/05/2021',
    invoiceNumber: 'INV0006',
    statusName: 'Chờ thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0006',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: '',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1600000',
        typeMoney: 'VND',
    },
    {
        total: '160',
        typeMoney: 'USD',
    },
    ],
},
{
    id: 107,
    createdDate: '07/05/2021',
    invoiceNumber: 'INV0007',
    statusName: 'Đã thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0007',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: 'Yêu cầu xóa',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1700000',
        typeMoney: 'VND',
    },
    {
        total: '170',
        typeMoney: 'USD',
    },
    ],
},
{
    id: 108,
    createdDate: '08/05/2021',
    invoiceNumber: 'INV0008',
    statusName: 'Chờ thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0008',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: '',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1800000',
        typeMoney: 'VND',
    },],
},
{
    id: 109,
    createdDate: '10/05/2021',
    invoiceNumber: 'INV0009',
    statusName: 'Chờ thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0009',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: '',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1900000',
        typeMoney: 'VND',
    },
    {
        total: '190',
        typeMoney: 'USD',
    },
    ],
},
{
    id: 110,
    createdDate: '12/05/2021',
    invoiceNumber: 'INV0010',
    statusName: 'Đã thanh toán',
    idCustomer: 10,
    creditNumber: 'CRE0010',
    customerName: 'Công ty tnhh Hòa Phát',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: 'Yêu cầu sửa',
    accountingDebt: '331',
    nameAccountingDebt: 'Phải trả người bán',
    accountingCredit: '642',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1750000',
        typeMoney: 'VND',
    },],
},
{
    id: 111,
    createdDate: '13/05/2021',
    invoiceNumber: 'INV00011',
    statusName: 'Chờ thanh toán',
    idCustomer: 2,
    creditNumber: 'CRE00011',
    customerName: 'Công ty tnhh Is Tech Vina',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: 'Yêu cầu Xóa',
    accountingDebt: '331',
    accountingCredit: '642',
    nameAccountingDebt: 'Phải trả người bán',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1000000',
        typeMoney: 'VND',
    },],
},
{
    id: 112,
    createdDate: '14/05/2021',
    invoiceNumber: 'INV00012',
    statusName: 'Chờ thanh toán',
    idCustomer: 2,
    creditNumber: 'CRE00012',
    customerName: 'Công ty tnhh Is Tech Vina',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: 'Yêu cầu Xóa',
    accountingDebt: '331',
    accountingCredit: '642',
    nameAccountingDebt: 'Phải trả người bán',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1000000',
        typeMoney: 'VND',
    },],
},
{
    id: 113,
    createdDate: '15/05/2021',
    invoiceNumber: 'INV00013',
    statusName: 'Chờ thanh toán',
    idCustomer: 2,
    creditNumber: 'CRE00013',
    customerName: 'Công ty tnhh Is Tech Vina',
    employeeName: 'Lê Thị Thảo',
    idEmployee: 1,
    content: 'test 01',
    request: 'Yêu cầu Xóa',
    accountingDebt: '331',
    accountingCredit: '642',
    nameAccountingDebt: 'Phải trả người bán',
    nameAccountingCredit: 'Chi phí quản lý doanh nghiệp',
    arrayMoney: [{
        total: '1000000',
        typeMoney: 'VND',
    },],
},
]

function checkDuplicate(array, elm) {
    var check = false;
    array.forEach(item => {
        if (item === elm) check = true;
    })
    return check;
}
var database = require('../database');
var mtblDMNhaCungCap = require('../tables/qlnb/tblDMNhaCungCap');

async function calculateTheTotalForCredit(array) {
    let arrayResult = []
    let total = 0
    for (let i = 0; i < array.length; i++) {
        total += Number(array[i].total)
    }
    arrayResult.push({
        type: 'VND',
        total: total
    })
    return arrayResult
}
async function calculateTheTotalAmountOfEachCurrency(array) {
    let arrayResult = []
    let arrayCheck = []
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].arrayMoney.length; j++) {
            if (!checkDuplicate(arrayCheck, array[i].arrayMoney[j].typeMoney)) {
                arrayCheck.push(array[i].arrayMoney[j].typeMoney)
                arrayResult.push({
                    total: Number(array[i].arrayMoney[j].total),
                    type: array[i].arrayMoney[j].typeMoney,
                    date: array[i].createdDate,
                })
            } else {
                arrayResult.forEach(element => {
                    if (element.type == array[i].arrayMoney[j].typeMoney) {
                        element.total += Number(array[i].arrayMoney[j].total)
                    }
                })
            }
        }
    }
    return arrayResult
}
async function getCustomerOfPMCM(page, itemPerPage) {
    let obj = {
        "paging": {
            "pageSize": itemPerPage,
            "currentPage": page,
            "rowsCount": 0
        }
    }
    let objResult = {}
    await axios.post(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/address_book/list_pmtc`, obj).then(async data => {
        if (data.data.data) {
            objResult['data'] = data.data.data.list;
            objResult['count'] = data.data.data.pager.rowsCount;
        }
    })
    return objResult
}
async function getDetailCustomerOfPMCM(idCustomer) {
    let objResult = {}
    await axios.get(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/address_book/get_by_id_pmtc?id=` + idCustomer).then(async data => {
        if (data.data.data) {
            objResult['data'] = data.data.data;
        }
    })
    console.log(objResult);
    return objResult
}
async function getInvoiceOrCreditOfPMCM(page, itemPerPage, type, status = null, customerID = null) {
    let typeRes = 1;
    if (type == 'credit')
        typeRes = 2
    let obj = {
        "type": typeRes,
        "paging": {
            "pageSize": itemPerPage,
            "currentPage": page,
            "rowsCount": 0
        }
    }
    if (status) {
        obj["status"] = converStatusPMCM(status)
    }
    if (customerID)
        obj["addressBookId"] = customerID
    let objResult = {}
    let totalMoneyVND = 0
    await axios.post(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/invoice/list_pmtc`, obj).then(async data => {
        if (data.data.data) {
            let arrayResult = []
            for (let item of data.data.data.list) {
                let refName = ''
                for (let ref = 0; ref < item.refDetailModels.length; ref++) {
                    if (item.refDetailModels[ref].agelessRef) {
                        if (ref < item.refDetailModels.length - 1)
                            refName += item.refDetailModels[ref].agelessRef + ', ';
                        else
                            refName += item.refDetailModels[ref].agelessRef;
                    }
                }
                let typeMoney = item.grandTotal[0] ? convertypeMoneyPMCM(item.grandTotal[0].unit) : 'VND';
                let arrayMoney = [{
                    total: item.grandTotal[0] ? item.grandTotal[0].total : 0,
                    typeMoney: typeMoney
                }];
                let departmentName = '';
                let address = '';
                let branchName = '';
                let employeeName = '';
                let staffCode = '';
                let nameAccounting = '';
                let payments = '';
                let payDate = '';
                let exchangeRate = 1;
                let remainingAmountArray = [{
                    key: typeMoney,
                    value: item.grandTotal[0] ? item.grandTotal[0].total : 0,
                }];
                let paidAmountArray = [];
                await database.connectDatabase().then(async db => {
                    if (typeMoney != '')
                        totalMoneyVND += await calculateMoneyFollowVND(db, typeMoney, item.grandTotal[0] ? item.grandTotal[0].total : 0, item.createDate)
                    if (item.userName) {
                        let tblDMUser = mtblDMUser(db);
                        let tblDMNhanvien = mtblDMNhanvien(db);
                        let tblDMBoPhan = mtblDMBoPhan(db);
                        tblDMUser.belongsTo(tblDMNhanvien, { foreignKey: 'IDNhanvien', sourceKey: 'IDNhanvien', as: 'staff' })
                        tblDMNhanvien.belongsTo(tblDMBoPhan, { foreignKey: 'IDBoPhan', sourceKey: 'IDBoPhan', as: 'department' })
                        tblDMBoPhan.belongsTo(mtblDMChiNhanh(db), { foreignKey: 'IDChiNhanh', sourceKey: 'IDChiNhanh', as: 'branch' })
                        await tblDMUser.findOne({
                            where: {
                                Username: item.userName
                            },
                            include: [
                                {
                                    model: tblDMNhanvien,
                                    required: false,
                                    as: 'staff',
                                    include: [
                                        {
                                            model: tblDMBoPhan,
                                            required: false,
                                            as: 'department',
                                            include: [
                                                {
                                                    model: mtblDMChiNhanh(db),
                                                    required: false,
                                                    as: 'branch'
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        }).then(user => {
                            departmentName = user.staff ? (user.staff.department ? user.staff.department.DepartmentName : '') : ''
                            branchName = user.staff ? (user.staff.department ? (user.staff.department.branch ? user.staff.department.branch.BranchName : '') : '') : ''
                            address = user.staff ? user.staff.Address : ''
                            employeeName = user.staff ? user.staff.StaffName : ''
                            staffCode = user.staff ? user.staff.StaffCode : ''
                        })
                    }
                    if (item.recondingTxName) {
                        await mtblDMTaiKhoanKeToan(db).findOne({
                            where: {
                                AccountingCode: item.recondingTxName
                            }
                        }).then(account => {
                            if (account) {
                                nameAccounting = account.AccountingName
                            } else {
                                nameAccounting = 'Không có tài khoản này trên hệ thống. Vui lòng cấu hình vào hệ thống!'
                            }
                        })
                    }
                    await mtblInvoice(db).findOne({
                        where: {
                            IDSpecializedSoftware: item.id ? item.id : null
                        }
                    }).then(invoice => {
                        if (invoice) {
                            payments = invoice.Payments ? invoice.Payments : null;
                            payDate = invoice.PayDate ? moment(invoice.PayDate).format('DD-MM-YYYY') : null;
                            paidAmountArray = [{
                                key: typeMoney,
                                value: invoice.PaidAmount ? invoice.PaidAmount : 0,
                            }]
                        }
                    })
                    await mtblCurrency(db).findOne({
                        where: {
                            ShortName: typeMoney
                        }
                    }).then(async curency => {
                        if (curency)
                            await mtblRate(db).findOne({
                                where: {
                                    Date: { [Op.substring]: moment(item.createDate).format('DD-MM-YYYY') },
                                    IDCurrency: curency.ID
                                }
                            }).then(rate => {
                                if (rate)
                                    exchangeRate = rate.ExchangeRate
                            })
                    })
                })
                let obj = {
                    id: item.id,
                    createdDate: item.createDate ? moment(item.createDate).format('DD-MM-YYYY') : null,
                    refNumber: refName,
                    address: address,
                    invoiceNumber: item.no ? item.no : '',
                    arrayMoney: arrayMoney,
                    statusName: converStatusPMCM(item.status),
                    idCustomer: item.addressBookId,
                    customerName: item.addressBookName,
                    content: item.note,
                    request: item.status == 3 ? 'Yêu cầu sửa' : (item.status == 4 ? 'Yêu cầu xóa' : ''),
                    departmentName: departmentName,
                    branchName: branchName,
                    accounting: item.recondingTxName ? item.recondingTxName : '',
                    nameAccounting: nameAccounting,
                    employeeName: employeeName,
                    staffName: employeeName,
                    staffcode: staffCode,
                    payDate: payDate,
                    payments: payments,
                    remainingAmountArray: remainingAmountArray,
                    paidAmountArray: paidAmountArray,
                    typeMoney: typeMoney,
                    exchangeRate: exchangeRate,
                }
                arrayResult.push(obj)
            }
            objResult['data'] = arrayResult;
            objResult['count'] = data.data.data.pager.rowsCount;
        }
    })
    let totalMoney = await calculateTheTotalAmountOfEachCurrency(objResult['data'])
    var result = {
        array: objResult['data'],
        status: Constant.STATUS.SUCCESS,
        message: Constant.MESSAGE.ACTION_SUCCESS,
        all: objResult['count'],
        totalMoneyVND: totalMoneyVND,
        totalMoney: totalMoney,
    }
    return result
}
async function getDetailInvCreOfPMCM(idInvCre) {
    let objResult = {}
    await axios.get(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/invoice/get_by_id_pmtc?id=` + idInvCre).then(async data => {
        if (data.data.data) {
            objResult['data'] = data.data.data;
        }
    })
    return objResult
}
function converStatusPMCM(status) {
    let result = status
    if (status == 2)
        result = 'Chờ thanh toán'
    if (status == 3)
        result = 'Yêu cầu sửa'
    if (status == 4)
        result = 'Yêu cầu xóa'
    if (status == 5)
        result = 'Yêu cầu thanh toán'
    if (status == 6)
        result = 'Đã thanh toán'
    if (status == 'Chờ thanh toán')
        result = 2
    if (status == 'Yêu cầu sửa')
        result = 3
    if (status == 'Yêu cầu xóa')
        result = 4
    if (status == 'Yêu cầu thanh toán')
        result = 5
    if (status == 'Đã thanh toán')
        result = 6
    return result
}
function convertypeMoneyPMCM(type) {
    let result = 'VND'
    if (type == 1)
        result = 'USD'
    if (type == 2)
        result = 'EURO'
    if (type == 3)
        result = 'FRANCE'
    if (type == 4)
        result = 'VND'
    return result
}
async function calculateMoneyFollowVND(db, typeMoney, total, date) {
    let exchangeRate = 1;
    let result = 0;
    let currency = await mtblCurrency(db).findOne({
        where: { ShortName: typeMoney }
    })
    if (currency)
        await mtblRate(db).findOne({
            where: {
                Date: {
                    [Op.substring]: date
                },
                IDCurrency: currency.ID
            },
            order: [
                ['ID', 'DESC']
            ],
        }).then(async Rate => {
            if (Rate)
                exchangeRate = Rate.ExchangeRate
            else {
                let searchNow = moment().format('YYYY-MM-DD');
                await mtblRate(db).findOne({
                    where: {
                        Date: {
                            [Op.substring]: searchNow
                        },
                        IDCurrency: currency.ID
                    },
                    order: [
                        ['ID', 'DESC']
                    ],
                }).then(Rate => {
                    if (Rate)
                        exchangeRate = Rate.ExchangeRate
                    else {

                    }
                })
            }
        })
    result = ((exchangeRate ? exchangeRate : 1) * total)
    return result
}
async function getExchangeRateFromDate(db, typeMoney, date) {
    let exchangeRate = 1;
    let result = {};
    let currency = await mtblCurrency(db).findOne({
        where: { ShortName: typeMoney }
    })
    if (currency)
        await mtblRate(db).findOne({
            where: {
                Date: {
                    [Op.substring]: date
                },
                IDCurrency: currency.ID
            },
            order: [
                ['ID', 'DESC']
            ],
        }).then(async Rate => {
            if (Rate)
                result = {
                    typeMoney: typeMoney,
                    exchangeRate: Rate.ExchangeRate,
                }
            else {
                let searchNow = moment().format('YYYY-MM-DD');
                await mtblRate(db).findOne({
                    where: {
                        Date: {
                            [Op.substring]: searchNow
                        },
                        IDCurrency: currency.ID
                    },
                    order: [
                        ['ID', 'DESC']
                    ],
                }).then(Rate => {
                    if (Rate)
                        result = {
                            typeMoney: typeMoney,
                            exchangeRate: Rate.ExchangeRate,
                        }
                })
            }
        })
    return result
}
module.exports = {
    getCustomerOfPMCM,
    test: async (req, res) => {
        let body = req.body;
        try {
            let result = await getDetailInvCreOfPMCM(3042)
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    },
    // change_customer_data
    changeCustomerData: async (req, res) => {
        let body = req.body;
        try {
            console.log(12345, body);
            var result = {
                status: Constant.STATUS.SUCCESS,
            }
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    },
    // change_invoice_or_credit_data
    changeInvoiceOrCreditData: async (req, res) => {
        let body = req.body;
        try {
            console.log(12345, body);
            var result = {
                status: Constant.STATUS.SUCCESS,
            }
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    },
    // get_list_department
    getListDepartment: async (req, res) => {
        await axios.get(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/department/share`).then(data => {
            if (data) {
                var result = {
                    array: data.data.data,
                    status: Constant.STATUS.SUCCESS,
                    message: Constant.MESSAGE.ACTION_SUCCESS,
                    all: data.data.data.length
                }
                res.json(result);
            } else {
                ``
                res.json(Result.SYS_ERROR_RESULT)
            }
            // console.log(data.data);
        })
    },
    // get_list_partner
    getListPartner: async (req, res) => {
        dataPartner = [{
            id: "2",
            partnerCode: "LOCK LOCK",
            name: "Công ty TNHH Lock & Lock",
            tax: "01245782110",
            address: "Số 72A Nguyễn Trãi phường Thượng Đỉnh Thanh Xuân Hà Nội",
            mobile: "0823145678",
            fax: "045784124",
            email: "locklockvn@gmail",
        },
        {
            id: "3",
            partnerCode: "HOA PHAT",
            name: "Công ty TNHH Hòa Phát ",
            tax: "012345678",
            address: "Số 12 Bạch Mai Hà Nội",
            mobile: "089745120",
            fax: "023145216",
            email: "hoaphat123@gmail.com",
        },
        {
            id: "4",
            partnerCode: "MEDIA MART",
            name: "Siêu thị điện máy xanh media mart",
            tax: "012345801",
            address: "Số 1 Trương Định Hà Nội",
            mobile: "089724152",
            fax: "021465741",
            email: "mediamart4546@gmail.com",
        },
        {
            id: "5",
            partnerCode: "GLOMED",
            name: "Công ty dược phẩm Glomed  ",
            tax: "012465563",
            address: "Số 34 Huỳnh Thúc Kháng Hà Nội",
            mobile: "012568523",
            fax: "012457821",
            email: "glomeddp@gmail.com",
        },
        {
            id: "6",
            partnerCode: "THUONG ĐINH",
            name: "Công ty giầy Thượng Đỉnh",
            tax: "012489660",
            address: "Số 2 Kim Ngưu Hà Nội",
            mobile: "021565635",
            fax: "014653225",
            email: "thuongdinhgiay@gmail.com",
        },
        {
            id: "7",
            partnerCode: "GIAY THANG LONG",
            name: "Công ty TNHH giày Thăng Long",
            tax: "012457821",
            address: "Số 2A Phường Khương Trung Thanh Xuân Hà Nội",
            mobile: "012465623",
            fax: "01774125",
            email: "giaytot@gmail.com",
        },
        {
            id: "8",
            partnerCode: "VINH DOAN",
            name: "Công ty cổ phần Vĩnh Đoàn",
            tax: "012458990",
            address: "Số 60 Vĩnh Tuy Hai Bà Trưng Hà Nội",
            mobile: "021565650",
            fax: "0158555245",
            email: "vinhdoan123@gmail.com",
        },
        {
            id: "9",
            partnerCode: "SINO VANLOCK",
            name: "Công ty sản xuất thiết bị điện Sino vanlock",
            tax: "0124456685",
            address: "SỐ 10 nguyễn Văn Cừ Long Biên Hà Nội",
            mobile: "0154878741",
            fax: "0157878865",
            email: "sinovanlock@gmail.com",
        },
        {
            id: "10",
            partnerCode: "TRUNG NGUYEN",
            name: "Tập đoàn cà phê Trung Nguyên",
            tax: "0125748546",
            address: "Thị Cấm Phường Xuân Phương Nam Từ Liêm Hà Nội",
            mobile: "045654565",
            fax: "013245422",
            email: "trugnnguyen@gmail.com",
        },

        ]
        // await axios.get(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/address_book/share`).then(data => {
        // console.log(data.data);
        if (dataPartner) {
            var result = {
                array: dataPartner,
                // array: data.data.data,
                status: Constant.STATUS.SUCCESS,
                message: Constant.MESSAGE.ACTION_SUCCESS,
                // all: data.data.data.length
                all: 10
            }
            res.json(result);
        } else {
            res.json(Result.SYS_ERROR_RESULT)
        }
        // console.log(data.data);
        // })
    },
    // get_list_customer
    getListCustomer: async (req, res) => {
        // await axios.get(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/address_book/partners_share`).then(data => {
        if (dataCustomer) {
            var result = {
                // array: data.data.data,
                array: dataCustomer,
                status: Constant.STATUS.SUCCESS,
                message: Constant.MESSAGE.ACTION_SUCCESS,
                all: 10
                // all: data.data.data.length
            }
            res.json(result);
        } else {
            res.json(Result.SYS_ERROR_RESULT)
        }
        // console.log(data.data);
        // })
    },
    // get_list_user
    getListUser: async (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let tblDMNhanvien = mtblDMNhanvien(db);
                    tblDMNhanvien.belongsTo(mtblDMBoPhan(db), { foreignKey: 'IDBoPhan', sourceKey: 'IDBoPhan', as: 'bp' })

                    tblDMNhanvien.findAll({
                        include: [{
                            model: mtblDMBoPhan(db),
                            required: false,
                            as: 'bp'
                        },],
                    }).then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                staffCode: element.StaffCode ? element.StaffCode : '',
                                fullName: element.StaffName ? element.StaffName : '',
                                departmentName: element.bp ? element.bp.DepartmentName : '',
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
    },
    // get_all_object
    getAllObject: async (req, res) => {
        database.connectDatabase().then(async db => {
            if (db) {
                let array = []
                for (c = 0; c < dataCustomer.length; c++) {
                    array.push({
                        name: dataCustomer[c].name,
                        address: dataCustomer[c].address,
                        code: dataCustomer[c].customerCode,
                        displayName: '[' + dataCustomer[c].customerCode + '] ' + dataCustomer[c].name,
                        id: dataCustomer[c].id,
                        type: 'customer',
                    })
                }
                await mtblDMNhanvien(db).findAll().then(data => {
                    data.forEach(element => {
                        array.push({
                            name: element.StaffName,
                            code: element.StaffCode,
                            displayName: '[' + element.StaffCode + '] ' + element.StaffName,
                            address: element.Address,
                            id: element.ID,
                            type: 'staff',
                        })
                    })
                })
                await mtblDMNhaCungCap(db).findAll().then(data => {
                    data.forEach(element => {
                        array.push({
                            name: element.SupplierName,
                            code: element.SupplierCode,
                            displayName: '[' + element.SupplierCode + '] ' + element.SupplierName,
                            address: element.Address,
                            id: element.ID,
                            type: 'supplier',
                        })
                    })
                })
                var result = {
                    array: array,
                    status: Constant.STATUS.SUCCESS,
                    message: Constant.MESSAGE.ACTION_SUCCESS,
                    all: 10
                }
                res.json(result);
            } else {
                res.json(Result.SYS_ERROR_RESULT)
            }
        })

    },

    // Invoice follow customer ------------------------------------------------------------------------------------------------------------------
    // get_list_invoice_from_customer
    getListInvoiceFromCustomer: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'invoice', null, body.idCustomer ? body.idCustomer : null)
        res.json(result)
    },
    // get_list_invoice_wait_for_pay_from_customer
    getListInvoiceWaitForPayFromCustomer: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'invoice', 'Chờ thanh toán', body.idCustomer ? body.idCustomer : null)
        res.json(result)
    },
    // get_list_invoice_paid_from_customer
    getListInvoicePaidFromCustomer: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'invoice', 'Đã thanh toán', body.idCustomer ? body.idCustomer : null)
        res.json(result)
    },

    // Credit follow customer ------------------------------------------------------------------------------------------------------------------
    // get_list_credit_from_customer
    getListCreditFromCustomer: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'credit', null, body.idCustomer ? body.idCustomer : null)
        res.json(result)
    },
    // get_list_credit_wait_for_pay_from_customer
    getListCreditWaitForPayFromCustomer: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'credit', 'Chờ thanh toán', body.idCustomer ? body.idCustomer : null)
        res.json(result)
    },
    // get_list_credit_paid_from_customer
    getListCreditPaidFromCustomer: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'credit', 'Đã thanh toán', body.idCustomer ? body.idCustomer : null)
        res.json(result)
    },


    // ------------------------------------------------------------------------------------------------------------------------------------------
    // get_list_invoice_from_partner
    getListInvoiceFromPartner: async (req, res) => {
        var body = req.body
        var obj = {
            "paging": {
                "pageSize": 10,
                "currentPage": 1,
            },
            "type": body.type
        }
        await axios.post(`http://ageless-ldms-api.vnsolutiondev.com/api/v1/invoice/share`, obj).then(data => {
            if (data) {
                if (data.data.status_code == 200) {
                    var result = {
                        array: data.data.data.list,
                        status: Constant.STATUS.SUCCESS,
                        message: Constant.MESSAGE.ACTION_SUCCESS,
                        all: data.data.data.pager.rowsCount
                    }
                    res.json(result);
                } else {
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Result.SYS_ERROR_RESULT)
            }
        })
    },
    // invoice-------------------------------------------------------------------------------------------------------------------------------------
    // get_list_tbl_invoice
    getListtblInvoice: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'invoice')
        res.json(result)
    },
    // get_list_invoice_wait_for_pay
    getListInvoiceWaitForPay: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'invoice', 'Chờ thanh toán')
        res.json(result)
    },
    // get_list_invoice_paid
    getListInvoicePaid: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'invoice', 'Đã thanh toán')
        res.json(result)
    },
    // get_list_invoice_edit_request
    getListInvoiceEditRequest: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'invoice', 'Yêu cầu sửa')
        res.json(result)
    },
    // get_list_invoice_delete_request
    getListInvoiceDeleteRequest: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page, body.itemPerPage, 'invoice', 'Yêu cầu xóa')
        res.json(result)
    },
    // credit-------------------------------------------------------------------------------------------------------------------------------------
    // get_list_credit
    getListCredit: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page ? body.page : 1, body.itemPerPage ? body.itemPerPage : 10, 'credit')
        res.json(result)
    },
    // get_list_credit_wait_for_pay
    getListCreditWaitForPay: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page ? body.page : 1, body.itemPerPage ? body.itemPerPage : 10, 'credit', 'Chờ thanh toán')
        res.json(result)
    },
    // get_list_credit_paid
    getListCreditPaid: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page ? body.page : 1, body.itemPerPage ? body.itemPerPage : 10, 'credit', 'Đã thanh toán')
        res.json(result)
    },
    // get_list_credit_edit_request
    getListCreditEditRequest: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page ? body.page : 1, body.itemPerPage ? body.itemPerPage : 10, 'credit', 'Yêu cầu sửa')
        res.json(result)
    },
    // get_list_Credit_delete_request
    getListCreditDeleteRequest: async (req, res) => {
        var body = req.body
        let result = await getInvoiceOrCreditOfPMCM(body.page ? body.page : 1, body.itemPerPage ? body.itemPerPage : 10, 'credit', 'Yêu cầu xóa')
        res.json(result)
    },


    //  api waiting SoftWare
    // -----------------------------------------------------------------------------------INVOICE-------------------------------------------------------------------------------
    // approval_invoice_and_credit
    approvalInvoiceAndCredit: async (req, res) => {
        var body = req.body
        database.connectDatabase().then(async db => {
            if (db) {
                await mtblInvoice(db).update({
                    Status: 'Chờ thanh toán',
                    Request: ''
                }, {
                    where: { IDSpecializedSoftware: body.id }
                })
                var result = {
                    status: Constant.STATUS.SUCCESS,
                    message: 'Đã phê duyệt thành công',
                }
                res.json(result);
            } else {
                res.json(Result.SYS_ERROR_RESULT)
            }
        })
    },
    // refuse_invoice_and_credit
    refuseInvoiceAndCredit: async (req, res) => {
        var body = req.body
        database.connectDatabase().then(async db => {
            if (db) {
                await mtblInvoice(db).update({
                    Status: 'Chờ thanh toán',
                    Request: ''
                }, {
                    where: { IDSpecializedSoftware: body.id }
                })
                var result = {
                    status: Constant.STATUS.SUCCESS,
                    message: 'Đã phê duyệt thành công',
                }
                res.json(result);
            } else {
                res.json(Result.SYS_ERROR_RESULT)

            }
        })

    },
}