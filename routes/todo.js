const express = require('express')
const passport = require('passport')
const router = express.Router()
const todos = require('../controllers/todos')

router.route('/')
.get(todos.allTodos)
.post(todos.newTodo)

router.route('/:id')
.delete(todos.deleteTodo)


module.exports = router