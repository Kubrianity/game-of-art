import { useEffect } from "react"

function Result({resultText, score, handleClick}) {
  useEffect(() => {
    document.body.classList.add('result')
  })
  return (
    <div className ="display-result">
      <div className = "score-container">
        <p className = "score-info"> {resultText} </p>
        <p>Your score: {score}</p>
        <button onClick = {handleClick} type = "button" className = "btn btn-light">Start Again</button>
      </div>
    </div>
  )
}
export default Result