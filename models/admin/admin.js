'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    user_name: String,
    password: String,
    id: Number,
    create_time: String,
    status: Number,
    city: String,
    avatar: String,
    admin: String,
})
const AdminModel = mongoose.model('admin', AdminSchema);

export default AdminModel;