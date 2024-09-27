const zod = require("zod");

// for post endpoint the input validation are required 
// for
//
//  body{
//  title: string,
//  description: string
//  }

const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
});


// for the put endpoint where input validation are required for 
//
// body{
// id: string
// }

const updateTodo = zod.object({
    id: zod.string(),
});


module.exports = {
    createTodo,
    updateTodo
};
