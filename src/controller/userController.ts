import {Request, Response} from 'express'
import {userService} from "../service"
import {IUserInputDTO} from "../interfaces/IUser"

const findUsers = (req: Request, res: Response) => {
    userService.findAll()
        .then((users) => {
            if (!users.length) return res.status(404).send({err: 'User not found'})
            res.json(`find successfully: ${users}`)
        })
        .catch(err => res.status(500).send(err))
}

const findUser = (req: Request, res: Response) => {
    const username = req.params.username
    userService.findByUsername({username}).then((user) => {
        if (!user) return res.status(404).send({err: 'User not found'})
        // res.send(`findOne successfully: ${user}`)
        // res.json(user)
        res.status(202)
    })
        .catch(err => res.status(500).json(err.message))
}

const createUser = (req: Request, res: Response) => {
    let userInput: IUserInputDTO = req.body
    userService.findByUsername(userInput).then((user) => {
        if (user) {
            res.status(404).send({err: 'User found'})
        } else {
            userService.save(userInput).then((user) => {
                // response.json(user)
                res.status(202)
            }).catch(err => res.status(500).json(err.message))
        }
    }).catch(err => {
        res.status(500).json(err.message)
    })
}

const deleteUser = (req: Request, res: Response) => {
    const username: string = req.params.username
    userService.deleteByUsername(username)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}

const saveUser = (req: Request, res: Response) => {
    let userInput: IUserInputDTO = req.body
    userService.save(userInput)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err))
}

export default {
    findUsers, findUser, createUser , deleteUser , saveUser
}