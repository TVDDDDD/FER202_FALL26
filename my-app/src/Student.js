import Person from "./Person";

class Student extends Person {
  constructor(name, age, scores) {
    super(name, age);
    this.scores = scores;
  }

  calculateAverageScore() {
    if (this.scores.length === 0) {
      return 0;
    }

    const totalScore = this.scores.reduce((total, score) => total + score, 0);
    return totalScore / this.scores.length;
  }

  displayFullInfo() {
    return `${this.introduce()} Scores: ${this.scores.join(", ")}. Average score: ${this.calculateAverageScore().toFixed(2)}.`;
  }
}

export default Student;
