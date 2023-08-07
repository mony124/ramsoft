import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useState } from "react";
import "./App.css";

const TaskTable = ({ tableData, handleDeleteCallback, handleEditCallback }) => {
  const [open, setOpen] = useState(false);
  const [tasktoUpdate, setTasktoUpdate] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    date: "",
  });

  const updateForm = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openModal = () => {
    setOpen(false);
  };
  const handleDelete = (idx) => {
    const deletedTable = tableData.filter((item, index) => index !== idx);
    handleDeleteCallback(deletedTable);
    localStorage.setItem("tasks", JSON.stringify(deletedTable));
  };

  const updateTask = (idx) => {
    const updatedTask = tableData.map((item, index) =>
      idx === index ? { ...item, ...formData } : item
    );
    console.log("UT", formData);
    handleEditCallback(updatedTask);
    openModal();
  };

  const handleEditPopup = (idx) => {
    const Update = tableData.filter((item, index) => index === idx);
    setTasktoUpdate(Update);
    setOpen(true);
  };

  return (
    <Container>
      {tableData?.length > 0 ? (
        <TableContainer sx={{ maxWidth: "850" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">TASK NAME</TableCell>
                <TableCell align="center">TASK DETAILS</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.details}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => handleEditPopup(index)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => handleDelete(index)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h3>No records!!</h3>
      )}
      <Dialog open={open}>
        {tasktoUpdate.length > 0 &&
          tasktoUpdate.map((item, index) => (
            <>
              <DialogTitle>Edit Task</DialogTitle>

              <DialogContent>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name" 
                  label="Task Name"
                  fullWidth
                  name="name"
                  defaultValue={item.name}
                  variant="standard"
                  onChange={updateForm}
                />
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Task Name"
                  fullWidth
                  name="details"
                  defaultValue={item.details}
                  variant="standard"
                  onChange={updateForm}
                />
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="date"
                  name="date"
                  label="date"
                  fullWidth
                  defaultValue={item.date}
                  variant="standard"
                  onChange={updateForm}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => updateTask(index)}>Edit</Button>
              </DialogActions>
            </>
          ))}
      </Dialog>
    </Container>
  );
};

export default TaskTable;
