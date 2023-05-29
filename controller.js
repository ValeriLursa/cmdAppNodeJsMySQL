const db = require("./db");

module.exports.run = function (swith_count, args) {
    let connection = db.connection();
    switch (swith_count) {
        case 0: {
            const sql_drop = "drop table customers";
            const message = "Таблица удалена";
            db.query_to_table(connection, sql_drop, message, false);
            break;
        }
        case 1: {
            const sql_create = "create TABLE customers(FIO VARCHAR(100), dateBorning date, sex char);";
            const message = "Таблица создана";
            db.query_to_table(connection, sql_create, message, false);
            break;
        }
        case 2: {
            const sql_insert = "insert customers(FIO, dateborning, sex) values(?, ?, ?);";
            const message = "Данные добавлены";
            db.query_to_table_with_values(connection, sql_insert, toArray(args), message, false);
            break;
        }
        case 3: {
            const sql_select = `select concat(FIO, dateborning) as id,
            FIO, dateborning, sex, 
           TIMESTAMPDIFF(YEAR, dateborning, curdate()) AS age 
           from customers order by FIO;`
            const message = "Результат select'а";
            db.query_to_table(connection, sql_select, message, true);
            break;
        }
        case 4: {
            const sql_insert = "insert customers(FIO, dateborning, sex) values(?, ?, ?);";
            let message = "";
            for (let i = 0; i < 100000; i++) {
                message = "1000000 людей добавлено";
                db.query_to_table_with_values(connection, sql_insert, randomPerson(), message, false, i);
            }
            console.log(message);
            for (let i = 0; i < 100; i++) {
                message = "100 людей добавлено";
                db.query_to_table_with_values(connection, sql_insert, personF(), message, false, i);
            }
            console.log(message);
            break;
        }
        case 5: {
            const sql_profiling = "set profiling=1;";
            db.profiling(connection, sql_profiling);
            const sql_select_F_m = "select * from customers where sex = 'm' and substring(FIO, 1, 1) = 'F'; ";
            const message = "Результат выборки:";
            db.query_to_table(connection, sql_select_F_m, message, true);
            const sql_profiles = "show profiles;";
            db.profile(connection, sql_profiles);
            break;
        }
        case 6: {
            const sql_create_index = "create index indexFIO on customers (FIO(1))";
            let message = "Инедкс создан";
            db.query_to_table(connection, sql_create_index, message, false);
            const sql_profiling = "set profiling=1;";
            db.profiling(connection, sql_profiling);
            const sql_select_F_m = "select FIO, dateborning, sex from customers where sex = 'm' and substring(FIO, 1, 1) = 'F'; ";
            message = "Результат выборки:";
            db.query_to_table(connection, sql_select_F_m, message, true);
            const sql_profiles = "show profiles;";
            db.profile(connection, sql_profiles);
            db.end_connection(connection);
            break;
        }
        case 20: {
            const sql_select_all = "select * from customers";
            const message = "Результат select'а";
            db.query_to_table(connection, sql_select_all, message, true);
            break;
        }
    }

}
// Функция для конвертации коллекции в массив
toArray = (args) => {
    let array = [args.FIO, args.dateBorn, args.sex];
    return array;
}


const alphabit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',"J", "K", 'L', "M", 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lengthLetter = alphabit.length;
const sex = ['m', 'w'];
// Функция для формирования случайного человека, вовращается массив из ФИО, даты рождения и пола
randomPerson = () => {
    let FIO = alphabit[Math.floor(Math.random() * lengthLetter)];
    FIO += ' FIO FIO';
    let sex_count = sex[Math.floor(Math.random() * 2)];
    let myDate = randomDate(new Date(1950, 1, 1), new Date());
    return [FIO, myDate, sex_count];
}
// Функция для формирования случайной даты рождения
function randomDate(start, end) {
    return new Date(start.getTime()
        + Math.random() * (end.getTime() - start.getTime()));
}
// Функция для формирования человека с фамилией, начинающейся с буквы F, со случайной датой рождения и полом
personF = () => {
    let FIO = "F FIO FIO";
    let sex_count = 'm';
    let myDate = randomDate(new Date(1950, 1, 1), new Date());
    return [FIO, myDate, sex_count];
}

