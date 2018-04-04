var express = require('express');
var router = express.Router();
var qp = require('flexqp-transaction');
qp.presetConnection(require('../dbconfig.json'));

router.get('/', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT `911`.incidents.ID,`911`.incidents.Name, Location, PostalCode, Type_Emergency, Phone_Num, Num_Casualties, Remarks, Pos_Prank, DATETIME, Operator_ID, LatLng, call_log, `911`.users.Name AS Operator_Name FROM `911`.incidents, `911`.users WHERE `911`.incidents.Operator_ID = `911`.users.ID', [], connection);
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
        var result_result = await qp.execute('SELECT * FROM `911`.incidents WHERE DATETIME > ? AND DATETIME < ?', [req.body.start, req.body.end], connection);
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
        var result_result = await qp.execute('SELECT * FROM `911`.incidents WHERE Type_Emergency = ?', [req.body.category], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/filter_id', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM `911`.incidents WHERE Operator_ID = ?', [req.body.Opid], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/filter', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var val = "(" + req.body.types + ")";
        var val2 = "(" + req.body.prank + ")";
        var start = req.body.start;
        var end = req.body.end;
        var querytest = 'SELECT `911`.incidents.ID,`911`.incidents.Name, Location, PostalCode, Type_Emergency, Phone_Num, Num_Casualties, Remarks, Pos_Prank, DATETIME, Operator_ID, LatLng, call_log, `911`.users.Name AS Operator_Name FROM `911`.incidents, `911`.users WHERE `911`.incidents.Operator_ID = `911`.users.ID AND DATETIME > "' + start + '" AND DATETIME < "' + end + '" AND Pos_Prank IN ' + val2 + ' AND Type_Emergency IN ' + val;
        console.log(querytest);
        var result_insert = await qp.execute(querytest, [], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_insert);
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
        /*let call = req.files.call;
        var url = '../phone_calls/' + call.name;
        await call.mv(url, function (err) {
            if (err) {
                return next(err);
            }
        });
        req.body.call_log = url;*/
        var result_insert = await qp.execute('insert into `911`.incidents set ?', [req.body], connection);
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