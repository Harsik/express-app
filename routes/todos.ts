import * as express from 'express';
const router = express.Router();

const todo = require('../models/todo');
// import {todo} from '../src/models/todo';

// Find All
router.get('/', (req, res) => {
    todo.findAll()
        .then((todos) => {
            if (!todos.length) return res.status(404).send({ err: 'Todo not found' });
            res.send(`find successfully: ${todos}`);
        })
        .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/todoid/:todoid', (req, res) => {
    todo.findOneByTodoid(req.params.todoid)
        .then((todo) => {
            if (!todo) return res.status(404).send({ err: 'Todo not found' });
            res.send(`findOne successfully: ${todo}`);
        })
        .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post('/', (req, res) => {
    todo.create(req.body)
        .then(todo => res.send(todo))
        .catch(err => res.status(500).send(err));
});

// Update by todoid
router.put('/todoid/:todoid', (req, res) => {
    todo.updateByTodoid(req.params.todoid, req.body)
        .then(todo => res.send(todo))
        .catch(err => res.status(500).send(err));
});

// Delete by todoid
router.delete('/todoid/:todoid', (req, res) => {
    todo.deleteByTodoid(req.params.todoid)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;