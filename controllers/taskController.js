const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedBy').populate('assignedTo'); // Optional: populate related fields
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status, dueDate, dueDate1, assignedBy, assignedTo } = req.body;

  try {
    const newTask = new Task({ 
      title, 
      description, 
      status, 
      dueDate, 
      dueDate1, 
      assignedBy, 
      assignedTo 
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task!', err.message);
    res.status(400).json({ message: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete task' });
  }
};

