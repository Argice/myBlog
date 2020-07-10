// 创建mongo客户端对象
const MongoClient = require('mongodb').MongoClient;

// 数据库地址
const url = 'mongodb://localhost:27017';

// 数据库名字
const dbName = 'blog';

// 封装数据库连接方法
function connect(callback) {
    // 使用connect方法连接到服务
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log('数据库连接失败', err)
        } else {
            // 数据库连接成功后，创建数据库连接对象
            console.log('数据库连接成功')
            var db = client.db(dbName)
            //如果执行程序有回调函数则执行回调
            callback && callback(db)
            // 操作完成需要关闭数据库
            client.close()
        }
    })
}

module.exports = { connect }