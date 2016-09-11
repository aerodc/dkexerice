var dataConfig = require('../data_source/config')
var sqlite3 = require('sqlite3').verbose();

var restResult = {};
var sqlResult = {}

var getAllColumns = function () {

    return function (callback) {

        var sql = "SELECT * FROM " + dataConfig.dataSource.db_table + " LIMIT 0,1";

        runSqliteRequest(sql)(function (sqlResult) {
            if (!!sqlResult['err']) {
                restResult['err'] = sqlResult['err'];
            } else {
               
                restResult['data'] = Object.getOwnPropertyNames(sqlResult['data'][0]).sort();
            }
            callback(restResult);

        });


    }
};


var getValuesByCol = function (col) {

    return function (callback) {
        var sql = "SELECT \"" + col + "\" as col,printf(\"%.1f\",sum(age)*1.0/count(*)) as value, count(*) as nb"
            + " FROM " + dataConfig.dataSource.db_table + " group by \"" + col + "\" order by nb desc LIMIT 0,100 ";

        runSqliteRequest(sql)(function () {
            if (!!sqlResult['err']) {
                restResult['err'] = sqlResult['err'];
            } else {
                restResult['data'] = sqlResult['data'];
            }
            callback(restResult);
        });

    }
};

var getTotalNb = function (col) {

    return function (callback) {
        var sql = "select count(*) as nb from (SELECT \"" + col + "\", count(*)"
            + " FROM " + dataConfig.dataSource.db_table + " group by \"" + col + "\")";

        runSqliteRequest(sql)(function () {
            if (!!sqlResult['err']) {
                restResult['err'] = sqlResult['err'];
            } else {
                restResult['data'] = sqlResult['data'];
            }
            callback(restResult);
        });
    }
};

// low level sqlite sql run
function runSqliteRequest(sql) {
    return function (callback) {
        var db = new sqlite3.Database(dataConfig.dataSource.db_file);
        db.serialize(function () {
            db.all(sql, function (err, rows) {
                console.log(sql);

                if (!!err) {
                    sqlResult['err'] = err;
                } else {
                    sqlResult['data'] = rows;
                }
                callback(sqlResult);
            });
        });

        db.close();
    }
}



module.exports.getAllColumns = getAllColumns;
module.exports.getValuesByCol = getValuesByCol;
module.exports.getTotalNb = getTotalNb;
