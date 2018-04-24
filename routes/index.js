// 路由主文件(管理一级路由)
'use strict';
import admin from './admin';
import Test from './test';
export default app => {
    app.use('/admin', admin);
    app.use('/test', Test);
}