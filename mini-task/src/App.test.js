import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

test("adds a task and updates the task summary", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText("Tên công việc"), {
    target: { value: "Đọc tài liệu React" },
  });
  fireEvent.click(screen.getByRole("button", { name: /thêm việc/i }));

  expect(screen.getByText("Đọc tài liệu React")).toBeInTheDocument();
  expect(screen.getByText("11")).toBeInTheDocument();
});

test("filters tasks and marks a task complete", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText("Lọc công việc"), {
    target: { value: "active" },
  });
  expect(screen.getByText("Học React Hooks")).toBeInTheDocument();
  expect(screen.queryByText("Làm bài tập JavaScript")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("checkbox", { name: /Học React Hooks/i }));
  expect(screen.queryByText("Học React Hooks")).not.toBeInTheDocument();
  expect(
    within(screen.getByLabelText("Quản lý công việc")).getByText("10"),
  ).toBeInTheDocument();
});

test("searches and deletes tasks", () => {
  render(<App />);

  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "React Hooks" },
  });
  expect(screen.getByText("Học React Hooks")).toBeInTheDocument();
  expect(screen.queryByText("Ôn tập useState")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Xóa Học React Hooks" }));
  expect(screen.queryByText("Học React Hooks")).not.toBeInTheDocument();
  expect(screen.getByText("9")).toBeInTheDocument();
});
