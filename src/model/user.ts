import * as mongoose from "mongoose"
import {IUser} from '../interfaces/IUser'

const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    })

export default mongoose.model<IUser & mongoose.Document>("User", userSchema)
