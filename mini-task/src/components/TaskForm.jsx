import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    onAdd(cleanTitle);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">Tên công việc</label>
      <input
        id="new-task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Bạn muốn hoàn thành việc gì?"
        maxLength={120}
      />
      <button className="add-button" type="submit" disabled={!title.trim()}>
        <span aria-hidden="true">+</span> Thêm việc
      </button>
    </form>
  );
}

export default TaskForm;
