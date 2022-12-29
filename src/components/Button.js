function Button({handleClick}) {
  return (
    <div className = "position-absolute top-50 start-50 translate-middle" >
      <button onClick = {handleClick} type = "button" className = "btn btn-warning">Start</button>
    </div>
  )
}
export default Button