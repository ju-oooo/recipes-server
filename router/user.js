const express = require('express');
const pool = require('../pool');
const router = express.Router();

/**
 * 检测用户是否存在
 * url http://localhost:5159/user/detection
 * 参数  wechart 微信号
 */
router.post('/detection', (req, res) => {
    let data = req.body;
    let wechart = data.wechart;
    let sql = 'select * from `user` where wechart=?';
    try {
        pool.query(sql, [wechart], (err, result) => {
            if (err) throw  err;
            if (result.length > 0) {
                res.send({code: 200, msg: '操作成功'})
            } else {
                res.send({code: 404, msg: '暂无此数据'})
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'})
    }
});

module.exports = router;