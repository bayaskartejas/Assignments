const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.json())

let todolist = [];

app.get("/todos",function(req,res){
    res.status(200).json(todolist);
})

app.get("/todos/:id", function(req,res){
    let id = parseInt(req.params.id);
    let item = todolist.find(item => item.id === id);
    if(!item){
        res.status(404).json({msg: "notFound!"})
    }    
    res.status(200).json(item)

})

app.post("/todos", function(req,res){
    let item = {
        id: parseInt(Math.random()*111111111),
        title: req.body.title,
        completed: req.body.completed,
        description: req.body.description
    }
    todolist.push(item)
    res.status(201).json({ msg : "posted!"})
})

app.put("/todos/:id", function(req,res){
    let id = parseInt(req.params.id);
    let replaceItem = todolist.find(item => item.id === id);
    if(!replaceItem){
        res.status(404).json({msg: "notfound!"})
    }
    else{
    replaceItem.title = req.body.title;
    replaceItem.completed = req.body.completed;
    res.status(200).json({msg: "put succesfully!"})        
    }
})

app.delete("/todos/:id", function(req,res){
    let id = parseInt(req.params.id);
    let deleteItem = todolist.find(item => item.id === id);
    if(!deleteItem){
        res.status(404).json({msg: "notfound!"})
    }
    else{
        todolist = todolist.filter(item => item.id != id)
        res.status(200).json({msg: "deleted!"})
    }
})
app.listen(3000); 
module.exports = app;  