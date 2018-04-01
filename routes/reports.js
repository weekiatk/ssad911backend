var express = require('express');
var router = express.Router();
var qp = require('flexqp-transaction');
qp.presetConnection(require('../dbconfig.json'));

router.get('/', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM `911`.reports WHERE escalate = "0"', [], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/setRead', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var val = "(" + req.body.ID + ")";
        console.log(val);
        var querytest = 'update `911`.reports set escalate = "1" WHERE ID IN ' + val;
        console.log(querytest);
        var result_insert = await qp.execute(querytest, [], connection);
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

router.post('/setEscalated', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var val = "(" + req.body.ID + ")";
        var querytest = 'update `911`.reports set escalate = "2" WHERE ID IN ' + val;
        var result_insert = await qp.execute(querytest, [], connection);
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

router.get('/CMO', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_get = await qp.execute('SELECT * FROM `911`.reports WHERE escalate = "2"', [], connection);
        var result_insert = await qp.execute('update `911`.reports set escalate = "3" WHERE escalate = "2"', [], connection);
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
        res.json(result_get);
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
        var val = req.body.text;
        console.log(val);
        var querytest = 'insert into `911`.reports (incident_id, caller_name, caller_number, level_of_priority, category, location, no_of_casualties, operator_id, operator_name, remarks) values ' + val;
        console.log(querytest);
        var result_insert = await qp.execute(querytest, [], connection);
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