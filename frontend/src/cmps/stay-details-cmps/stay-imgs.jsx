import "react-responsive-carousel/lib/styles/carousel.css"
import { Carousel } from "react-responsive-carousel"
import { stayService } from "../../services/stay.service"

export const StayImgs = ({ imgUrls }) => {
  return (
    <section className="img-layout">
      {/* for mobile */}
      <div className="imgs-carousel-container">
        <Carousel showThumbs={false} showArrows={false} showStatus={false}>
          {imgUrls.map((imgUrl) => {
            return (
              <img src={stayService.getImageUrl(imgUrl)} alt="" key={imgUrl} loading="lazy"/>
            )
          })}
        </Carousel>
      </div>

      {/* wider screen */}
      <div className="stay-imgs-container">
        <img
          className="main-img-container"
          src={stayService.getImageUrl(imgUrls[0])}
          alt=""
          loading="lazy"
        />
        {imgUrls.map((imgUrl, idx) => {
          if (idx === 0) return null
          let style = null
          if (idx === 2) style = { borderTopRightRadius: "12px" }
          if (idx === 4) style = { borderBottomRightRadius: "12px" }
          return (
            <img
              style={style}
              className="secondary-img-container"
              key={idx}
              src={stayService.getImageUrl(imgUrl)}
              alt=""
              loading="lazy"
            />
          )
        })}
      </div>
    </section>
  )
}
