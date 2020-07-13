var express = require('express');
var router = express.Router();
var model = require('../model');


// 新增、编辑
router.post('/add', function (req, res, next) {
    var id = parseInt(req.body.id)
    if (id) {  // 编辑
        var page = req.body.page
        var title = req.body.title
        var content = req.body.content
        model.connect(function (db) {
            db.collection('articles').updateOne({ id: id }, {
                $set: {
                    title: title,
                    content: content
                }
            }, function (err, ret) {
                if (err) {
                    console.log('修改失败', err)
                } else {
                    console.log('修改成功')
                    res.redirect('/?page=' + page)
                }
            })
        })
    } else {   // 新增
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
    }
})


// 删除文章
router.get('/delete', function (req, res, next) {
    var id = parseInt(req.query.id)
    var page = req.query.page
    model.connect(function (db) {
        db.collection('articles').deleteOne({ id: id }, function (err, ret) {
            if (err) {
                console.log('删除失败')
            } else {
                console.log('删除成功')
            }
            res.redirect('/?page=' + page)
        })
    })
})


module.exports = router;
