var express = require('express');
var router = express.Router();
var qp = require('flexqp-transaction');
qp.presetConnection(require('../dbconfig.json'));
var crypto = require('crypto');

router.get('/', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM `911`.users', [], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/find', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM `911`.users WHERE Username = ?', [req.body.Username], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/findid', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM `911`.users WHERE ID = ?', [req.body.ID], connection);
        await qp.commitAndCloseConnection(connection);
        res.json(result_result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/login', async function (req, res, next) {
  try {
    var connection = await qp.connectWithTbegin();
        const secret = 'abcdefg';
        var pass = req.body.Password;
        var hash = crypto.createHmac('sha256', secret)
                     .update(pass)
                     .digest('hex');
      req.body.Password = hash;
        var result_result = await qp.execute('SELECT * FROM `911`.users WHERE Username = ? AND Password = ?', [req.body.Username, req.body.Password], connection);
      await qp.commitAndCloseConnection(connection);
      res.json(result_result);
  }
  catch (error) {
      qp.rollbackAndCloseConnection(connection);
      error.status = 406;
      next(error);
  }
});

router.post('/delete', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_insert = await qp.execute('delete from `911`.users WHERE ID = ?', [req.body.ID], connection);
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

router.post('/update', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_insert = await qp.execute('update `911`.users set Username = ?, Name = ?, JobID = ?, Email = ? WHERE ID = ?', [req.body.Username, req.body.Name, req.body.JobID, req.body.Email, req.body.ID], connection);
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

router.post('/changePassword', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        const secret = 'abcdefg';
        var opass = req.body.oldpass;
        var npass = req.body.newpass;
        var hash = crypto.createHmac('sha256', secret)
                     .update(opass)
                     .digest('hex');
        req.body.oldpass = hash;
        var hash1 = crypto.createHmac('sha256', secret)
                     .update(npass)
                     .digest('hex');
        req.body.newpass = hash1;
        var result_insert = await qp.execute('update `911`.users set Password = ? WHERE ID = ? AND Password = ?', [req.body.newpass, req.body.ID, req.body.oldpass], connection);
        let result = {};
        if (result_insert.affectedRows > 0){
        result.affectedRows = result_insert.affectedRows;
        result.changedRows = result_insert.changedRows;
        result.fieldCount = result_insert.fieldCount;
        result.insertId = result_insert.insertId;
        result.message = result_insert.message;
        result.protocol41 = result_insert.protocol41;
        result.serverStatus = result_insert.serverStatus;
        result.warningCount = result_insert.warningCount;
        result.success = true;
        }
        await qp.commitAndCloseConnection(connection);
        res.json(result);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

router.post('/resetPassword', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        const secret = 'abcdefg';
        var pass = req.body.Password;
        var hash = crypto.createHmac('sha256', secret)
                     .update(pass)
                     .digest('hex');
        req.body.Password = hash;
        var result_insert = await qp.execute('update `911`.users set Password = ? WHERE Username = ? AND Email = ?', [req.body.Password, req.body.Username, req.body.Email], connection);
        let result = {};
        if (result_insert.affectedRows > 0){
        result.affectedRows = result_insert.affectedRows;
        result.changedRows = result_insert.changedRows;
        result.fieldCount = result_insert.fieldCount;
        result.insertId = result_insert.insertId;
        result.message = result_insert.message;
        result.protocol41 = result_insert.protocol41;
        result.serverStatus = result_insert.serverStatus;
        result.warningCount = result_insert.warningCount;
        result.success = true;
        }
        await qp.commitAndCloseConnection(connection);
        res.json(result);
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
        const secret = 'abcdefg';
        var pass = req.body.Password;
        var hash = crypto.createHmac('sha256', secret)
                     .update(pass)
                     .digest('hex');
      req.body.Password = hash;
        var result_insert = await qp.execute('insert into `911`.users set ?', [req.body], connection);
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