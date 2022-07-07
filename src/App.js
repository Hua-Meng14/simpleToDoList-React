import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import UpdateForm from "./components/UpdateForm";
import Todo from "./components/Todo";

function App() {
  // Task {ToDo list State}
  const [toDo, setToDo] = useState([]);

  // Temp State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  // Delete Task
  const deleteTask = (id) => {
    let newTask = toDo.filter((task) => task.id !== id);
    setToDo(newTask);
  };

  // Mark task as done or completed
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  // Cancel Update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Cancel Update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  // Update Task
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedData = [...filterRecords, updateData];
    setToDo(updatedData);
    setUpdateData("");
    //
  };

  return (
    <div className="container App">
      <br></br>
      <h2>To Do List App ReactJs</h2>
      <br></br>
      {/* // Update from */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {toDo && toDo.length ? "" : "No Tasks....."}
      <Todo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
