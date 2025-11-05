import './index.css'

const NoInternet = props => {
  const {onclickRetry} = props
  const onClick = () => {
    onclickRetry()
  }
  return (
    <div className="nointernet-container">
      <img
        src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755620244/Frame_8830_1_kgnu6z.png"
        alt="failure view"
        className="nointernet-img"
      />
      <p className="nointernet-heading">
        Something went wrong. Please try again
      </p>
      <button className="try-again-button" type="button" onClick={onClick}>
        Try Again
      </button>
    </div>
  )
}
export default NoInternet
