var express = require('express');
var router = express.Router();
var model = require('../model');


// 新增、编辑
router.post('/add', function (req, res, next) {
    var data = {
        title: req.body.title,
        content: req.body.content,
        username: req.session.username,
        id: Date.now()
    }
    model.connect(function (db) {
        db.collection('articles').insertOne(data, function (err, ret) {
            if (err) {
                console.log('文件发布失败', err)
                res.redirect('/write')
            } else {
                res.redirect('/')
            }
        })
    })
})


module.exports = router;
