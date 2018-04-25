'use strict'
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let idSchema = new Schema({
    user_id: Number
})

let idModel = mongoose.model("testId", idSchema);
idModel.findOne((error, data) => {
    if (!data) {
        let newid = new idModel({
            user_id: 0
        })
        newid.save();
    }
})

export default idModel;