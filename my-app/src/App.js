import "./App.css";
import Student from "./Student";
import { createScores } from "./scores";

function App() {
  const scores = createScores(8, 9, 10);
  const newScores = [7, 10];
  const mergedScores = [...scores, ...newScores];
  const student = new Student("John Doe", 20, mergedScores);
  const { name, age } = student;

  return (
    <div className="App">
      <main className="person-card">
        <p className="eyebrow">ES6 Student Management</p>
        <h1>Student Information</h1>
        <p>
          Name: {name} | Age: {age}
        </p>
        <p>{student.displayFullInfo()}</p>
      </main>
    </div>
  );
}

export default App;
