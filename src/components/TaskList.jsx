import TaskCard from "./TaskCard";
import { Typography } from "@mui/material";

const TaskList = ({ tasks, onMarkDone, onRemove }) => {
  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Task List
      </Typography>
      {tasks.length === 0 ? (
        <Typography>No tasks added yet.</Typography>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMarkDone={onMarkDone} onRemove={onRemove} />
        ))
      )}
    </div>
  );
};

export default TaskList;