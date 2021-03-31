//  固定写法三步：
// 1.加载 MySQL 模块
// var mysql = require('mysql');
// // 2.创建 MySQL 连接对象
// var connection = mysql.createConnection({
//     host: 'localhost',   // 你要连接的数据库服务器的地址
//     port: 3306,// 端口号
//     user: 'root',        // 连接数据库服务器需要的用户名
//     password: 'root',        // 连接数据库服务器需要的密码
//     database: 'hreo'      //你要连接的数据库的名字
// });
// //3.连接 MySQL 服务器
// connection.connect((err) => {
//     // 如果有错误对象，表示连接失败
//     if (err) return console.log('数据库连接失败')
//     // 没有错误对象提示连接成功
//     console.log('mysql数据库连接成功')
// });

// // 导出模块
// module.exports = connection;
// module.exports = connection;


module.exports = {
    query: function (sql, callback) {
        const mysql = require('mysql');
        const conn = mysql.createConnection({
            host: 'localhost',   // 你要连接的数据库服务器的地址
            user: 'root',        // 连接数据库服务器需要的用户名
            password: 'root',        // 连接数据库服务器需要的密码
            database: 'bignews1'      //你要连接的数据库的名字
        });
        conn.connect();
        // 完成增删改查
        conn.query(sql, callback);
        conn.end();
    }
}