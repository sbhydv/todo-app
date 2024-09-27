// write basic express boilerplate
//  with express.json() middleware

const express = require("express");
const server = express();
const { createTodo, updateTodo} = require("./types");
const { todo_models } = require("./db");


//middlware
server.use(express.json());

//body{
// title : string;
// description : string;
// }




// to add the todos
server.post("/todos", async (req,res) => {
        const createTodoPayload = req.body;
        const parseCreateTodoPayload = createTodo.safeParse(createTodoPayload);
        if(!parseCreateTodoPayload){
            res.status(411).json({
                msg : "You sent the wrong inputs"
            });
            return;
        }

    // put the payload into the mongodb
    try{
        const todoInDb = await todo_models.create({
                          title: createTodoPayload.title,
                         description: createTodoPayload.description,
                         completed: false
    });
        res.json({
            id : todoInDb._id,
            msg : "todo has been created"
        });
    }
    catch(err){
        console.log(err);
        res.json({
            msg : err.massage
        });
    }

});


// to reterive the todos
server.get("/todos",async (req,res) =>{
        const allTodos = await todo_models.find({});
        
    res.json({
        todos: allTodos
    });

});

// to mark down the todo as complete
server.put("/todos", async (req,res) =>{
    const updateTodoPayload = req.body;
    const parseUpdateTodoPayload = updateTodo.safeParse(updateTodoPayload);
    if(!parseUpdateTodoPayload){
        res.status(411).json({
            msg : "You sent the wrong input"
        });
        return;
    }

    // update the todo collection's document field in the mongodb
        
    await todo_models.findByIdAndUpdate(req.body.id, { completed : true },{new : true} );

    res.json({
        msg: "Todo has been marked as completed",
    });
    
});

server.listen(8080 , ()=>{
    console.log(`Server is listening at port : 8080`);
});
