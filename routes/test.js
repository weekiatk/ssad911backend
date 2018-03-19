var express = require('express');
var router = express.Router();
var qp = require('flexqp-transaction');
qp.presetConnection(require('../dbconfig.json'));

router.get('/', async function (req, res, next) {
    try {
        var connection = await qp.connectWithTbegin();
        var result_result = await qp.execute('SELECT * FROM ssad_db.Incidents', [], connection);
        res.json(result_result);
        var result_result2 = await qp.execute('SELECT * FROM ssad_db.Users', [], connection);
        console.log(result_result2)
        await qp.commitAndCloseConnection(connection);
    }
    catch (error) {
        qp.rollbackAndCloseConnection(connection);
        error.status = 406;
        next(error);
    }
});

module.exports = router;