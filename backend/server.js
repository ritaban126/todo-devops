// //server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const TodoModel = require("./models/todolist");


// var app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to your MongoDB database (replace with your database URL)
// mongoose.connect(process.env.MONGODB_URI);

// // Check for database connection errors
// mongoose.connection.on("error", (error) => {
//     console.error("MongoDB connection error:", error);
// });

// // Get saved tasks from the database
// app.get("/getTodoList", (req, res) => {
//     TodoModel.find({})
//         .then((todoList) => res.json(todoList))
//         .catch((err) => res.json(err));
// });

// // Add new task to the database
// app.post("/addTodoList", (req, res) => {
//     TodoModel.create({
//         task: req.body.task,
//         status: req.body.status,
//         deadline: req.body.deadline, 
//     })
//         .then((todo) => res.json(todo))
//         .catch((err) => res.json(err));
// });

// // Update task fields (including deadline)
// app.post("/updateTodoList/:id", (req, res) => {
//     const id = req.params.id;
//     const updateData = {
//         task: req.body.task,
//         status: req.body.status,
//         deadline: req.body.deadline, 
//     };
//     TodoModel.findByIdAndUpdate(id, updateData)
//         .then((todo) => res.json(todo))
//         .catch((err) => res.json(err));
// });

// // Delete task from the database
// app.delete("/deleteTodoList/:id", (req, res) => {
//     const id = req.params.id;
//     TodoModel.findByIdAndDelete({ _id: id })
//         .then((todo) => res.json(todo))
//         .catch((err) => res.json(err));
// });

// // app.get("/test", async (req, res) => {
// //     const data = await TodoModel.create({
// //         task: "Test Task",
// //         status: "Pending",
// //         deadline: new Date()
// //     });
// //     res.json(data);
// // });

// app.listen(3000, () => {
//     console.log('Server running on 3000');
// });



import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import TodoModel from './models/todolist.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Check DB connection errors
mongoose.connection.on('error', error => {
  console.error('MongoDB connection error:', error);
});

// Get all todos
app.get('/getTodoList', (req, res) => {
  TodoModel.find({})
    .then(todoList => res.json(todoList))
    .catch(err => res.json(err));
});

// Add todo
app.post('/addTodoList', (req, res) => {
  TodoModel.create({
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  })
    .then(todo => res.json(todo))
    .catch(err => res.json(err));
});

// Update todo
app.post('/updateTodoList/:id', (req, res) => {
  const id = req.params.id;

  const updateData = {
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  };

  TodoModel.findByIdAndUpdate(id, updateData)
    .then(todo => res.json(todo))
    .catch(err => res.json(err));
});

// Delete todo
app.delete('/deleteTodoList/:id', (req, res) => {
  const id = req.params.id;

  TodoModel.findByIdAndDelete({ _id: id })
    .then(todo => res.json(todo))
    .catch(err => res.json(err));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});