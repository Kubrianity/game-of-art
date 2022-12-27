import { useEffect } from "react"

function Result({result, handleClick}) {
  useEffect(() => {
    document.body.classList.add('result')
  })
  return (
    <div className ="display-result">
      <div className = "score-container">
        <p className = "score-info"> {result} </p>
        <button onClick = {handleClick} type = "button" className = "btn btn-light">Start Again</button>
      </div>
    </div>
  )
}
export default Result