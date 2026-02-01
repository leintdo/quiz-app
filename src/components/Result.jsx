import React from "react";

//score, totalQuestions, restartTest, rewatchTest
const Result = (props) => {
  return (
    <div>
      <h1>Result</h1>
      <p className="result">
        You have {props.score} / {props.totalQuestions} correct answers 👏👏👏
      </p>
      <div className="resultButtonsContainer">
        <button className="result-button" onClick={props.restartTest}>Restart</button>
        <button className="result-button" onClick={props.rewatchTest}>Rewatch</button>
      </div>
    </div>
  );
};

export default Result;
