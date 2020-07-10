var express = require('express');
var router = express.Router();
var model = require('../model')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// 注册接口
router.post('/regist', function (req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2
  }
  // 数据校验
  /* 自行扩展 */
  // 插入数据库
  model.connect(function (db) {
    db.collection('users').insertOne(data, function (err, ret) {
      if (err) {
        console.log('注册失败');
        res.redirect('/regist');
      } else {
        res.redirect('/login');
      }
    });
  })
  // res.send(data);
});

// 登陆接口
router.post('/login', function (req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password,
  }
  // 数据校验
  /* 自行扩展 */
  // 查询数据库用户密码存在
  model.connect(function (db) {
    db.collection('users').find(data).toArray(function (err, docs) {
      if (err) {
        res.redirect('/login')
      } else {
        if (docs.length > 0) {
          // 登陆成功进行session会话存储
          req.session.username = data.username;

          res.redirect('/')
        } else {
          res.redirect('/login')
        }
      }
    })
  })
})

module.exports = router;
