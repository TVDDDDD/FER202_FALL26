import "./App.css";
import Person from "./Person";

function App() {
  const person = new Person("John Doe", 20);

  return (
    <div className="App">
      <main className="person-card">
        <p className="eyebrow">ES6 Student Management</p>
        <h1>Person Information</h1>
        <p>{person.introduce()}</p>
      </main>
    </div>
  );
}

export default App;
