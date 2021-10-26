import * as express from 'express';
const userRouter = express.Router();
const User = require('../models/user');

userRouter.get('/', (req, res) => {
  User.findAll()
      .then((users) => {
        if (!users.length) return res.status(404).send({ err: 'User not found' });
        res.send(`find successfully: ${users}`);
      })
      .catch(err => res.status(500).send(err));
});

userRouter.get('/:username', (req, res) => {
  User.findOneByUsername(req.params.username)
      .then((user) => {
        if (!user) return res.status(404).send({ err: 'User not found' });
        res.send(`findOne successfully: ${user}`);
      })
      .catch(err => res.status(500).send(err));
});

userRouter.post('/', (req, res) => {
  User.create(req.body)
      .then(user => res.send(user))
      .catch(err => res.status(500).send(err));
});

userRouter.put('/:username', (req, res) => {
  User.updateByUsername(req.params.username, req.body)
      .then(user => res.send(user))
      .catch(err => res.status(500).send(err));
});

userRouter.delete('/:username', (req, res) => {
  User.deleteByUsername(req.params.username)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err));
});

module.exports = userRouter;