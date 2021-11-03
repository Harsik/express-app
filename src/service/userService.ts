import { IUserInputDTO, userUniqueSearchInput, IUser } from "../interfaces/IUser"
import User from "../model/User"

const save = (userInput: IUserInputDTO) => {
    const user = new User(userInput)
    return user.save()
}

const findAll = () => {
    return User.find({})
}

const findByUsername = (userInfo: userUniqueSearchInput) => {
    const { username } = userInfo
    return User.findOne({ username })
}

const deleteByUsername = (username:string) => {
    return User.deleteOne().where("username",username)
}

export default {
    save,
    findAll,
    findByUsername,
    deleteByUsername
}