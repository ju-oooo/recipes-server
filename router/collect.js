const express = require('express');
const pool = require('../pool');
const router = express.Router();
/**
 * 添加收藏菜品
 * url http://localhost:5159/collect/insert
 */
router.post('/insert', (req, res) => {
    let data = req.body;
    let cuisineId = parseInt(data.cuisineId);
    let time = new Date().getTime();
    let userId = parseInt(data.userId);
    let sql = 'INSERT INTO `collect` (`cuisine_id`, `time`, `user_id`) VALUES (?, ?, ?)';
    try {
        pool.query(sql, [cuisineId, time, userId], (err, result) => {
            if (err) throw  err;
            if (result.affectedRows > 0) {
                res.send({code: 200, msg: '操作成功'})
            } else {
                res.send({code: 201, msg: '操作失败'})
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'})
    }
});
/**
 * 删除收藏菜品
 * url http://localhost:5159/collect/delete
 */
router.post('/delete', (req, res) => {
    let data = req.body;
    let cuisineId = parseInt(data.cuisineId);
    let userId = parseInt(data.userId);

    let sql = 'DELETE FROM `collect` WHERE cuisine_id=? AND user_id=?';
    try {
        pool.query(sql, [cuisineId, userId], (err, result) => {
            if (result.affectedRows > 0) {
                res.send({code: 200, msg: '操作成功'})
            } else {
                res.send({code: 201, msg: '操作失败'})
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'})
    }
});
/**
 * 获取收藏菜品
 * url http://localhost:5159/collect/
 */
router.post('/', (req, res) => {
    let data = req.body;
    let userId = parseInt(data.userId);
    let sql = 'SELECT col.cuisine_id id,cui.title,cui.description,cui.img_url,col.time FROM `collect` col join  `cuisine` cui on col.cuisine_id = cui.id where user_id=?';
    try {
        pool.query(sql, [userId], (err, result) => {
            if (result.length > 0) {
                res.send({code: 200, cuisineList: result})
            } else {
                res.send({code: 404, msg: '暂无此数据'})
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'})
    }
});
module.exports = router;
