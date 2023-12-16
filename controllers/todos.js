const Todo = require('../models/todo')


module.exports.allTodos = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.isAuthenticated()) {
          req.flash('error', 'Please login to view tasks');
          return res.redirect('/login');
        }

        // Access the user information from req.user
        const userId = req.user._id;

        // Query tasks associated with the user
        const userTodos = await Todo.find({ user: userId });

        // Render the 'home' view with the user-specific tasks
        res.render('home', { todos: userTodos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching tasks' });
    }
};


module.exports.newTodo = async (req, res) => {
    try {
        const { title } = req.body;
        
        // Check if the user is authenticated
        if (!req.isAuthenticated()) {
          req.flash('error', 'User not authenticated');
          return res.redirect('/login');
        }

        // Access the user information from req.user
        const userId = req.user._id;

        // Create a new task associated with the user
        const newTodo = new Todo({
            title,
            user: userId, // Set the user field to the user's _id
        });

        // Save the task to the database
        await newTodo.save();
        res.redirect('/todos');
        req.flash('success', "New task added")
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding task' });
    }
};



module.exports.deleteTodo = async (req,res)=>{
  const {id} = req.params;
  await Todo.findByIdAndDelete(id)
  req.flash('success', 'Successfully deleted task')
  res.redirect('/todos')
}
  


