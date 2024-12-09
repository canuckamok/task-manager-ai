import { useState, useEffect, useMemo } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { fetchTaskEstimate } from "./utils/openaiService";
import { Container, Typography, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (e) {
      console.error("Error parsing tasks from localStorage", e);
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(false);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    try {
      console.log("Saving tasks to localStorage:", tasks); // Debug log
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (e) {
      console.error("Error saving tasks to localStorage", e);
    }
  }, [tasks]);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
      },
    }), [darkMode]);

    const addTask = (name, description) => {
      console.log("Adding Task:", name, description); // Debug log
    
      const newTask = { id: Date.now(), name, description, done: false };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        console.log("Tasks after addition:", updatedTasks); // Log updated state
        return updatedTasks;
      });
    
      // Fetch GPT estimate after adding the task
      fetchTaskEstimate(newTask)
        .then((estimate) => {
          console.log("Received estimate:", estimate); // Log GPT response
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === newTask.id ? { ...task, estimate } : task
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching estimate:", error);
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === newTask.id ? { ...task, estimate: "Estimate not found" } : task
            )
          );
        });
    };
    

  

  const markTaskAsDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Outer flex container */}
      <div className={`app-container ${darkMode ? "" : "light-mode"}`}>
        <div className="app-content">
          <Container>
            <Typography variant="h3" sx={{ marginBottom: 4 }}>
              Task Manager
            </Typography>
            <TaskInput onAddTask={addTask} />
            <TaskList tasks={tasks} onMarkDone={markTaskAsDone} onRemove={removeTask} />
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
