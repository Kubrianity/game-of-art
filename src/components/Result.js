import { useEffect } from "react"

function Result({result}) {
  useEffect(() => {
    document.body.classList.add('result')
  })
  return (
    <div className ="display-result">
      <div className = "score-container">
        <p className = "score-info"> {result} </p>
      </div>
    </div>
  )
}
export default Result