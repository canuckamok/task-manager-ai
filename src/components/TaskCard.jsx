import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import "./TaskCard.css"; // Import the CSS file

const TaskCard = ({ task, onMarkDone, onRemove }) => {
  return (
    <Card className={`task-card ${task.done ? "task-done" : ""}`}>
      <CardContent>
        {/* Task Name */}
        <Typography variant="h6" className="task-name">
          {task.name}
        </Typography>

        {/* Task Description */}
        <Typography variant="body2" className="task-description">
          {task.description}
        </Typography>

        {/* Estimated Time */}
        {task.estimate && (
          <Typography variant="body2" className="task-estimate">
            {`Estimated time: ${task.estimate}`}
          </Typography>
        )}

        {/* Delegable Status */}
        {task.delegable && (
          <Typography variant="body2" className="task-delegable">
            {`Delegable: ${task.delegable}`}
          </Typography>
        )}

        {/* Action Buttons */}
        <Box className="task-actions">
          <Button
            onClick={() => onMarkDone(task.id)}
            variant="outlined"
            color={task.done ? "warning" : "success"}
          >
            {task.done ? "Undo" : "Mark Done"}
          </Button>
          <Button
            onClick={() => onRemove(task.id)}
            variant="outlined"
            color="error"
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;