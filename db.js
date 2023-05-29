const mysql = require("mysql2");

module.exports.connection = function () {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "persons",
        password: "admin"
    }).promise();
}

// Выполнение запроса к базе данных, для всех запросов, которые не принимают значения
module.exports.query_to_table = function (connection, sql, message, flag_for_results) {
    connection.query(sql)
        .then((results) => {
            console.log(message);
            if (flag_for_results) console.log(results[0]);
        })
        .then(() => {
            connection.end();
        })
        .catch((err) => {
            console.log(err);
        })
}
// Выполнени запроса к базе данных, для запросов, которые передаю значения
module.exports.query_to_table_with_values = function (connection, sql, values, message, flag_for_results, count) {
    connection.query(sql, values)
        .then((results) => {
            if (flag_for_results) console.log(results);
            console.log(values);
            console.log(count);
        })
        .then(() => {
            connection.end();
        })
        .then(() => {
        })
        .catch((err) => {
            console.log(err);
        });
}

// Включение профайлинга для подсчета времени вполнения запроса
module.exports.profiling = function (connection, sql) {
    connection.query(sql)
        .then(() => {
            console.log("Профайлинг включен");
        })
        .then(() => {
            connection.end();
        })
        .catch((err) => {
            console.log(err);
        })
}

//Вывод profile
module.exports.profile = (connection, sql) => {
    connection.query(sql)
        .then((results) => {
            // console.log("Лист профайл");
            console.log(`Время выполнения запроса: ${results[0][0].Duration}`);
        })
        .then(() => {
            connection.end();
        })
        .catch((err) => {
            console.log(err);
        });
}


// закрытие подключения
module.exports.end_connection = (connection) => {
    connection.end(function (err) {
        if (err) {
            return console.log("Ошибка: " + err.message);
        }
        console.log("Подключение закрыто");
    });
}