const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./router/user');
const cuisineRouter = require('./router/cuisine');
const cuisineTypeRouter = require('./router/cuisineType');
const collectRouter = require('./router/collect');

const server = express();
//端口号 5159 5357
server.listen(5159);
//解决跨域请求
server.use(cors({
    origin: '*'
}))
//静态公共资源
server.use(express.static('./public'))
//post数据格式化
server.use(bodyParser.urlencoded({extended: false}));
//用户模块
server.use('/user', userRouter);
//菜单模块
server.use('/cuisine', cuisineRouter);
//菜单类型模块
server.use('/cuisineType', cuisineTypeRouter);
//收藏模块
server.use('/collect', collectRouter);
console.log('http://localhost:5159/cuisine/details');
