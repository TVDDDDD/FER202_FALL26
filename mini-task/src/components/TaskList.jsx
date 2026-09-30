import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✳</span>
        <p>Chưa tìm thấy công việc nào.</p>
        <span>Thử đổi từ khóa hoặc bộ lọc nhé.</span>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
