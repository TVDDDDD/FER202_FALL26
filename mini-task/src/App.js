import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ThemeProvider } from "./context/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { initialTasks } from "./tasks";

function App() {
  const [tasks, setTasks] = useLocalStorage(
    "mini-task-manager-tasks",
    initialTasks,
  );
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const addTask = (title) => {
    setTasks((currentTasks) => [
      { id: `${Date.now()}-${Math.random()}`, title, completed: false },
      ...currentTasks,
    ]);
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);
    return (
      matchesFilter &&
      task.title
        .toLocaleLowerCase("vi")
        .includes(search.trim().toLocaleLowerCase("vi"))
    );
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <ThemeProvider>
      <main className="app-shell">
        <section className="task-panel" aria-label="Quản lý công việc">
          <Header />
          <div className="panel-content">
            <TaskForm onAdd={addTask} />
            <div className="task-toolbar">
              <label className="control-wrap" htmlFor="task-filter">
                <span className="sr-only">Lọc công việc</span>
                <select
                  id="task-filter"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="active">Chưa làm</option>
                  <option value="completed">Hoàn thành</option>
                </select>
              </label>
              <label className="search-wrap">
                <span className="search-icon" aria-hidden="true">
                  ⌕
                </span>
                <span className="sr-only">Tìm kiếm công việc</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm kiếm công việc..."
                />
              </label>
            </div>
            <div className="task-summary" aria-live="polite">
              <span>
                Tổng <strong>{tasks.length}</strong>
              </span>
              <span>
                Chưa làm <strong>{tasks.length - completedCount}</strong>
              </span>
              <span>
                Hoàn thành <strong>{completedCount}</strong>
              </span>
            </div>
            <TaskList
              tasks={visibleTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
