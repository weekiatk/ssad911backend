var express = require('express');
var router = express.Router();
var qp = require('flexqp-transaction');
qp.presetConnection(require('../dbconfig.json'));

router.get('/', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM 911.incidents', [], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/filter_time', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM 911.incidents WHERE DATETIME > ? AND DATETIME < ?', [req.body.start, req.body.end], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/filter_cat', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM 911.incidents WHERE Type_Emergency = ?', [req.body.category], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/create', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_insert = await qp.execute('insert into 911.incidents set ?', [req.body], connection);
        let result = {};
        result.affectedRows = result_insert.affectedRows;
        result.changedRows = result_insert.changedRows;
        result.fieldCount = result_insert.fieldCount;
        result.insertId = result_insert.insertId;
        result.message = result_insert.message;
        result.protocol41 = result_insert.protocol41;
        result.serverStatus = result_insert.serverStatus;
        result.warningCount = result_insert.warningCount;
        result.success = true;
        await qp.commitAndCloseConnection(connection);
        res.json(result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

module.exports = router;