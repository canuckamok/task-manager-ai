import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const TaskInput = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault(); // Prevent the form from submitting
  
    if (taskName.trim() && taskDescription.trim()) {
      onAddTask(taskName, taskDescription);
      setTaskName(""); // Clear inputs
      setTaskDescription("");
    } else {
      console.error("Task name or description is missing!");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginBottom: 4,
        maxWidth: "600px",
      }}
    >
      <TextField
        label="Task Name"
        variant="outlined"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <TextField
        label="Task Description"
        variant="outlined"
        multiline
        rows={3}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskInput;