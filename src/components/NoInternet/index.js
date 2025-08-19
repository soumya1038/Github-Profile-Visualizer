import './index.css'

const NoInternet = () => (
  <div className="nointernet-container">
    <img
      src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755620244/Frame_8830_1_kgnu6z.png"
      alt="nointernet"
      className="nointernet-img"
    />
    <p className="nointernet-heading">Something went wrong. Please try again</p>
    <button className="try-again-button" type="button">
      Try again
    </button>
  </div>
)

export default NoInternet
