import { Button, Container, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import TaskTable from "./TaskTable";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    date: "",
  });
  const [taskData, setTaskData] = useState([]);

  console.log(taskData)
  useEffect(()=>{
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'))
    setTaskData([localStorageTasks] || [])
  },[setTaskData])


  const updateForm = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createNew = () => {
    console.log("cn",taskData, formData)
    setTaskData([...taskData, formData]);
    localStorage.setItem('tasks', JSON.stringify(formData))
    setFormData({
      name: "",
      details: "",
      date: "",
    });

  };

  const handleDeleteCallback = (newValue) => {
    setTaskData(newValue)
  }

  const handleEditCallback = (newValue) => {
    setTaskData(newValue)
  }

  return (
    <div className="App">
      <h1>Task Manager Application</h1>
      <Container size="medium">
        <FormControl fullWidth margin="normal" size="medium">
          <TextField
            value={formData.name}
            margin="normal"
            id="task-name"
            name="name"
            label="Task Name"
            variant="outlined"
            onChange={updateForm}
          />
          <TextField
            value={formData.details}
            margin="normal"
            id="task-details"
            name="details"
            label="Task details"
            variant="outlined"
            onChange={updateForm}
          />
          <TextField
            value={formData.date}
            type="date"
            margin="normal"
            id="finish-date"
            name="date"
            variant="outlined"
            onChange={updateForm}
          />
          <Button variant="contained" onClick={createNew}>
            Create New Task
          </Button>
        </FormControl>
      </Container>
      <TaskTable tableData={taskData || []} handleDeleteCallback={handleDeleteCallback} handleEditCallback={handleEditCallback}/>
    </div>
  );
}

export default App;
