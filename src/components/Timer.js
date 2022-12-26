function Timer({remainingTime}) {
  return (
  <div>
    <span>0: {remainingTime < 10 ? "0" + remainingTime : remainingTime} </span>
  </div>   
  )
}
export default Timer