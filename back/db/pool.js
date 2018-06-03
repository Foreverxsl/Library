require('babel-polyfill');
var mysql = require('mysql');
//建立连接池
var pool = mysql.createPool({
        host: 'localhost',  
        user:'root',
        password:'root',
        database:'lab05',
    });
function getConnection(){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,conn){
            if(!err){
                resolve(conn);
            }else{
                reject(err);
            }
        });
    })
}
//执行sql
function execute(sql){
    return new Promise(function(resolve,reject){
        var connection;
        getConnection().then(function(conn){
            //connection=conn;
            conn.query(sql,function(err,result){
                if(!err){
                    resolve(result);
                    conn.release();
                    console.log("释放完成");
                }else{
                    reject(err);
                }
            });
        }).catch(function(err){
            reject(err)
        })/*.finally(function(){
            if(connection){
                connection.release();
                console.log("释放完成");
            }
        });*/
    });
}
module.exports={
    getConnection,
    execute
};