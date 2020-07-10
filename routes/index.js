var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();
// 引入model
var model = require('../model');

/* GET home page. */
router.get('/', function (req, res, next) {
  model.connect(function (db) {
    db.collection('users').find().toArray(function (err, docs) {
      // console.log('用户查询', docs)
      res.render('index', { title: 'Express' });
    })
  })

});

// 渲染注册页
router.get('/regist',function(req,res,next){
  res.render('regist',{})
})

// 渲染登陆页
router.get('/login',function(req,res,next){
  res.render('login',{})
})
module.exports = router;
