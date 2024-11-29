import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [highlightedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sortDirection, setSortDirection] = useState('asc');
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getTasks/${currentUser.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/createTask/${currentUser.id}`,
        { ...newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/editTask/${taskId}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
      setEditTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/deleteTask/${deleteTaskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.filter((task) => task._id !== deleteTaskId));
      setDeleteTaskId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setTasks(sortedTasks);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-24">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">To-Do List</h2>

      {/* Task Creation Form */}
      <div className="mb-6 p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 rounded flex-grow"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border p-2 rounded flex-grow"
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={createTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Sorting & Tasks List */}
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={sortTasks}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sort by Date {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
          key={task._id}
          className={`p-4 bg-white shadow-lg rounded-lg relative ${
            task.dueDate.startsWith(highlightedDate) ? 'border-blue-500 border-2' : ''
          }`}
        >
          {task.dueDate.startsWith(highlightedDate) && (
            <span className="absolute top-2 right-2 text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded">
              Today
            </span>
          )}
            <div className="flex justify-between items-center">
              <div>
            <h3 className="text-lg font-bold text-blue-600">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            </div>
            
        </div>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => setEditTask(task)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => setDeleteTaskId(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                <FaTrash />
              </button>
              <button
          onClick={() => updateTask(task._id, { ...task, isCompleted: !task.isCompleted })}
          className={`px-4 py-2 rounded ${
            task.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300'
          }`}
        >
          {task.isCompleted ? 'Completed' : 'Mark as Complete'}
        </button>
              
            </div>
            
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Task</h3>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              value={editTask.description}
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="date"
              value={editTask.dueDate}
              onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditTask(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => updateTask(editTask._id, editTask)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTaskId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteTaskId(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteTask}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
