//
// Todo{
//
//  title: string
//  description: string
//  completed : boolean
//
//  }

const mongoose = require("mongoose");

mongoose.connect("");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo_models = mongoose.model("todo_models", todoSchema);

module.exports = {
    todo_models
};
