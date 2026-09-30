function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? ' is-complete' : ''}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="custom-checkbox" aria-hidden="true"><span>✓</span></span>
        <span className="task-title">{task.title}</span>
      </label>
      <button className="delete-button" type="button" onClick={() => onDelete(task.id)} aria-label={`Xóa ${task.title}`} title="Xóa công việc">
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}

export default TaskItem;
