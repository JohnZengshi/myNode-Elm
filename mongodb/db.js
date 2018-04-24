// 对MongoDB进行便捷操作的对象模型工具
import mongoose from 'mongoose';

import config from 'config-lite';
// 颜色插件
import chalk from 'chalk';

mongoose.connect(config.url, {
    useMongoClient: true
});
mongoose.Promise = require("bluebird");
const db = mongoose.connection;
db.once('open', () => {
    console.log(
        chalk.green("数据库连接成功")
    )
})
db.on('error', (error) => {
    console.error(
        chalk.red('数据库连接失败' + error)
    );
    mongoose.disconnect()
});
db.on('close', () => {
    console.log(
        chalk.red("数据库断开，正在重新连接数据库")
    )
    mongoose.connect(config.url, {
        server: {
            auto_reconnect: true
        }
    });
});

export default db;