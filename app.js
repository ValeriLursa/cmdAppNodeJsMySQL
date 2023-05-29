const yargs = require("yargs");
const controller = require("./controller");

yargs.command({
    command: "0",
    describe: 'Очистка таблицы',
    handler() {
        controller.run(0);
    }
})
yargs.command({
    command: "1",
    describe: 'Добавить таблицу',
    handler() {
        controller.run(1);
    }
})

yargs.command({
    command: "2",
    describe: 'Добавить запись в таблицу',
    builder: {
        FIO: {
            type: "string",
            demandOption: true,
            descrube: "ФИО"
        },
        dateBorn: {
            type: "date",
            demandOption: true,
            descrube: "Дата рождения"
        },
        sex: {
            type: "string",
            demandOption: true,
            descrube: "Пол"
        }
    },
    handler(args) {
        controller.run(2, args);
    }
})
yargs.command({
    command: "3",
    describe: 'Вывод отсортированного массива людей',
    handler() {
        controller.run(3);
    }
})
yargs.command({
    command: "4",
    describe: 'Автозаполнение таблицы',
    handler() {
        controller.run(4);
    }
})
yargs.command({
    command: "5",
    describe: 'Выборка из таблицы, параметры: первый символ фио F, пол мужской',
    handler() {
        controller.run(5);
    }
})
yargs.command({
    command: "6",
    describe: 'Выборка из таблицы, параметры: первый символ фио F, пол мужской',
    handler() {
        controller.run(6);
    }
})
yargs.command({
    command: "20",
    describe: 'Вывод всех столбцов таблицы',
    handler() {
        controller.run(20);
    }
})

yargs.parse()