import React, { useEffect, useState } from "react";
import Result from "./Result";

const quizData = [
  {
    question: "5 + 3 = ?",
    options: {
      A: "6",
      B: "7",
      C: "8",
      D: "9",
    },
    answer: "C",
  },
  {
    question: "12 - 7 = ?",
    options: {
      A: "3",
      B: "4",
      C: "5",
      D: "6",
    },
    answer: "C",
  },
  {
    question: "6 × 4 = ?",
    options: {
      A: "20",
      B: "22",
      C: "24",
      D: "26",
    },
    answer: "C",
  },
  {
    question: "20 ÷ 5 = ?",
    options: {
      A: "2",
      B: "3",
      C: "4",
      D: "5",
    },
    answer: "C",
  },
  {
    question: "9 + 6 = ?",
    options: {
      A: "13",
      B: "14",
      C: "15",
      D: "16",
    },
    answer: "C",
  },
];

const Quiz = () => {
  // Declare Variables
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: quizData.length }),
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  let answerList = ["A", "B", "C", "D"];

  // Handle
  function handleSelectedAnswer(key, value) {
    if (key === quizData[currentQuestion].answer) {
      setUserScore((oldScore) => oldScore + 1);
    }
    setSelectedAnswer(key);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = key;
    setUserAnswers(newUserAnswers);
  }
  // Submit

  // Next Questions
  function nextQuestion() {
    if (quizData.length - 1 === currentQuestion) {
      setIsFinished(true);
    } else setCurrentQuestion((prevIdx) => prevIdx + 1);
  }

  // Prev Questions
  function prevQuestion() {
    setCurrentQuestion((prevIdx) => prevIdx - 1);
  }

  // Reload when userAnswers or currenQuestion is changed
  useEffect(() => {
    if (answerList.includes(userAnswers[currentQuestion])) {
      setSelectedAnswer(userAnswers[currentQuestion]);
    } else {
      setSelectedAnswer("");
    }
  }, [userAnswers, currentQuestion]);

  function restart() {
    setCurrentQuestion(0);
    setIsFinished(false);
    setSelectedAnswer("");
    setUserScore(0);
    setUserAnswers(Array.from({ length: quizData.length }));
  }

  function rewatch() {
    setCurrentQuestion(0);
    setIsFinished(false);
  }

  // Result
  if (isFinished) {
    return (
      <Result
        score={userScore}
        totalQuestions={quizData.length}
        restartTest={restart}
        rewatchTest={rewatch}
      />
    );
  }
  // HTML
  return (
    <div>
      <h2>
        Câu {currentQuestion + 1}: {quizData[currentQuestion].question}
      </h2>
      {Object.entries(quizData[currentQuestion].options).map(([key, value]) => (
        <button
          key={key}
          className={`option-btn ${selectedAnswer === key ? "selected" : ""}`}
          disabled={!!selectedAnswer && selectedAnswer !== key}
          onClick={() => handleSelectedAnswer(key, value)}
        >{`${key}. ${value}`}</button>
      ))}

      {selectedAnswer ? (
        selectedAnswer === quizData[currentQuestion].answer ? (
          <p className="answer correct-answer">Correct Answer!</p>
        ) : (
          <p className="answer wrong-answer">Wrong Answer!</p>
        )
      ) : (
        ""
      )}
      <div id="nav">
        <button
          className="nav-btn"
          disabled={currentQuestion === 0}
          onClick={() => prevQuestion()}
        >
          Back
        </button>
        <button
          className="nav-btn"
          disabled={!selectedAnswer}
          onClick={() => nextQuestion()}
        >
          {currentQuestion === quizData.length - 1 ? `Submit` : `Next`}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
