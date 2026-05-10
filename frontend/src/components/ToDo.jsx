import React, { useState, useEffect } from "react";
import axios from "axios";

function ToDo() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [todoList, setTodoList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  // Fetch todos on mount
  useEffect(() => {
    axios
      .get(`${API_URL}/getTodoList`)
      .then((result) => setTodoList(result.data))
      .catch((err) => console.log(err));
  }, [API_URL]);

  // Toggle editable row
  const toggleEditable = (_id) => {
    const rowData = todoList.find((data) => data._id === _id);
    if (rowData) {
      setEditableId(_id);
      setEditedTask(rowData.task);
      setEditedStatus(rowData.status);
      setEditedDeadline(
        rowData.deadline ? new Date(rowData.deadline).toISOString().slice(0, 16) : ""
      );
    } else {
      setEditableId(null);
      setEditedTask("");
      setEditedStatus("");
      setEditedDeadline("");
    }
  };

  // Add task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask || !newStatus || !newDeadline) {
      alert("All fields must be filled out.");
      return;
    }

    axios
      .post(`${API_URL}/addTodoList`, {
        task: newTask,
        status: newStatus,
        deadline: newDeadline,
      })
      .then((result) => {
        setTodoList([...todoList, result.data]);
        setNewTask("");
        setNewStatus("");
        setNewDeadline("");
      })
      .catch((err) => console.log(err));
  };

  // Save edited task
  const saveEditedTask = (_id) => {
    if (!editedTask || !editedStatus || !editedDeadline) {
      alert("All fields must be filled out.");
      return;
    }

    const editedData = {
      task: editedTask,
      status: editedStatus,
      deadline: editedDeadline,
    };

    axios
      .post(`${API_URL}/updateTodoList/${_id}`, editedData)
      .then(() => {
        setTodoList(
          todoList.map((todo) =>
            todo._id === _id ? { ...todo, ...editedData } : todo
          )
        );
        setEditableId(null);
        setEditedTask("");
        setEditedStatus("");
        setEditedDeadline("");
      })
      .catch((err) => console.log(err));
  };

  // Delete task
  const deleteTask = (_id) => {
    axios
      .delete(`${API_URL}/deleteTodoList/${_id}`)
      .then(() => {
        setTodoList(todoList.filter((todo) => todo._id !== _id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Todo List */}
        <div className="md:w-2/3 bg-white shadow rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
            Todo List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-4 py-2 text-left">Task</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Deadline</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {todoList.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-400">
                      No tasks yet.
                    </td>
                  </tr>
                ) : (
                  todoList.map((data) => (
                    <tr key={data._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2">
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                          />
                        ) : (
                          data.task
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                          />
                        ) : (
                          data.status
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editableId === data._id ? (
                          <input
                            type="datetime-local"
                            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={editedDeadline}
                            onChange={(e) => setEditedDeadline(e.target.value)}
                          />
                        ) : data.deadline ? (
                          new Date(data.deadline).toLocaleString()
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        {editableId === data._id ? (
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                            onClick={() => saveEditedTask(data._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                            onClick={() => toggleEditable(data._id)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          onClick={() => deleteTask(data._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Task */}
        <div className="md:w-1/3 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
            Add Task
          </h2>
          <form onSubmit={addTask} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-600">Task</label>
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Status</label>
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Deadline</label>
              <input
                type="datetime-local"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
