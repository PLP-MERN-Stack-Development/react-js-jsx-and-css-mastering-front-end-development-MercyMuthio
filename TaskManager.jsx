import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from './ui/Card';
import Button from './ui/Button';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Task Manager
        </h1>
        
        {/* Add Task Form */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Button onClick={addTask}>
            Add Task
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {['all', 'active', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'primary' : 'secondary'}
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType}
            </Button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              {tasks.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match the current filter.'}
            </p>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                  task.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-800 dark:text-white'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-sm"
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {tasks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total: {tasks.length} | 
              Active: {tasks.filter(t => !t.completed).length} | 
              Completed: {tasks.filter(t => t.completed).length}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TaskManager;
