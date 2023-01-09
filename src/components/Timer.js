function Timer({remainingTime}) {
  return (
    <div className = "timer">
      <span>0: {remainingTime < 10 ? "0" + remainingTime : remainingTime} </span>
    </div>   
  )
}
export default Timer