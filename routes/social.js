var express = require('express');
var router = express.Router();
var qp = require('flexqp-transaction');
qp.presetConnection(require('../dbconfig.json'));
var crypto = require('crypto');

router.get('/', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM `911`.smalogs', [], connection);
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
        /*let screenshot = req.files.Screenshot;
        var url = '../screenshots/' + screenshot.name;
        await screenshot.mv(url, function (err) {
            if (err) {
                return next(err);
            }
        });
        //console.log(screenshot);
        req.body.Screenshots = url;*/
        var result_insert = await qp.execute('insert into `911`.smalogs set ?', [req.body], connection);
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