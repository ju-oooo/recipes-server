const express = require('express');
const pool = require('../pool');
const router = express.Router();

/**
 * 获取菜品类型
 * url http://localhost:5159/cuisineType/
 */
router.post('/', (req, res) => {
    let data = req.body;
    let id = parseInt(data.id);
    let sql = 'SELECT id,title,img_url FROM `cuisine_type`';
    try {
        pool.query(sql, [id], (err, result) => {
            if (err) throw  err;
            if (result.length > 0) {
                res.send({code: 200, cuisine: result})
            } else {
                res.send({code: 404, msg: '暂无此数据'})
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'})
    }
});
module.exports = router;