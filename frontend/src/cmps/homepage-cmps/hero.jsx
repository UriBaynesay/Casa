export const Hero = () => {
  return (
    <div className="hero main-layout">
      <div className="hero-container">
        <div className="img-container">
          <img src={require("../../assets/img/hero/hero.jpg")} alt="" loading="lazy"/>
          <div className="hero-txt">
            <h1>Not sure where to go? Perfect.</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
