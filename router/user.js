const express = require('express');
const pool = require('../pool');
const router = express.Router();

/**
 * 检测用户是否存在
 */
router.post('/detectionUser', (req, res) => {
    let data = req.body;
    let count = parseInt(data.count);
    if (isNaN(count) || count < 5) {
        count = 100;
    }
    let sql = 'select b.id,b.bookName,b.author,b.numberWord,t.name type from book b  join book_type t where t.id = b.typeId order by rand() limit 0,?';
    pool.query(sql, [count], (err, result) => {
        if (err) throw  err;
        if (result.length > 0) {
            res.send({code: 200, bookList: result})
        } else {
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});

module.exports = router;