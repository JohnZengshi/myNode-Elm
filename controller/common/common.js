'use strict'
import idModel from '../../models/id/id';
export default class common {
    async getId(idName) {
        let idData = await idModel.findOne();
        idData[idName]++;
        await idData.save();
        return idData[idName];
    }
}