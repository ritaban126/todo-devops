// const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//     task: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//     },
//     deadline: {
//         type: Date,
//     },
// });


// const todoList = mongoose.model("todo", todoSchema);

// module.exports = todoList;


import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  deadline: {
    type: Date,
  },
});

const TodoList = mongoose.model('todo', todoSchema);

export default TodoList;