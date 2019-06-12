/** 菜单模块 **/
const express = require('express');
const pool = require('../pool');
const pagingTool = require('../tool/pagingTool');
const router = express.Router();


/**
 * 获取首页菜品 列表
 * url http://localhost:5159/cuisine/
 * 参数  count 显示条数  pageNum 页数
 */
router.post('/', (req, res) => {
    let data = req.body;
    let pageParam = pagingTool(data.count, data.pageNum, 20);
    // let sql = 'SELECT id,title,description,img_url FROM `cuisine` ORDER BY id LIMIT ?,?';
    let sql = 'SELECT id,title,description,img_url FROM `cuisine` ORDER BY RAND() LIMIT ?,?';
    try {
        pool.query(sql, [pageParam.start, pageParam.end], (err, result) => {
            if (err) throw  err;
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

/**
 * 根据类型获取菜品列表
 * url http://localhost:5159/cuisine/type
 * 参数  typeId 类型 count 显示条数  pageNum 页数
 */
router.post('/type', (req, res) => {
    let data = req.body;
    let typeId = parseInt(data.typeId);
    let pageParam = pagingTool(data.count, data.pageNum, 20);
    let sql = 'SELECT id,title,description,img_url FROM `cuisine` WHERE type_id=? LIMIT ?,?';
    try {
        pool.query(sql, [typeId, pageParam.start, pageParam.end], (err, result) => {
            if (err) throw  err;
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
/**
 * 获取菜品详情
 * url http://localhost:5159/cuisine/details
 * 参数  id 菜品ID
 */
router.post('/details', (req, res) => {
    let data = req.body;
    let id = parseInt(data.id);
    let userId = parseInt(data.userId);
    let sql = 'SELECT id,title,description,img_url,food_material,cooking_step,type_id FROM `cuisine` WHERE id=?';
    try {
        pool.query(sql, [id], (err, result) => {
            if (result.length > 0) {
                if (!userId) {
                    res.send({code: 200, details: result[0]});
                } else {
                    let details = result[0];
                    let sql = 'SELECT id FROM `collect` WHERE cuisine_id=? AND user_id=?';
                    pool.query(sql, [id, userId], (err, result) => {
                        if (result.length > 0) {
                            res.send({code: 200, details: details, star: true});
                        } else {
                            res.send({code: 200, details: details, star: false});
                        }
                    });
                }
            } else {
                res.send({code: 404, msg: '暂无此数据'})
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'})
    }

});

module.exports = router;
