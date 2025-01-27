export const LocationModal = ({ onSetFilter, onCloseModal }) => {
  const locations = [
    "Spain",
    "United States",
    "Canada",
    "Hong kong",
    "Brazil",
    "Portugal",
  ]
  return (
    <div className="location-modal">
      <h4>Search by region</h4>
      <div className="location-cards-container">
        {locations.map((location) => {
          return (
            <div
              className="card"
              onClick={() => {
                onSetFilter(location, "stayLocation")
              }}
            >
              <div className="img-container">
                <img
                  src={require(`../../assets/img/countries/${location} search.png`)}
                  alt=""
                  loading="lazy"
                />
              </div>
              <h4>{location}</h4>
            </div>
          )
        })}
      </div>
      <h3
        className="close-modal-btn"
        onClick={() => {
          onCloseModal()
        }}
      >
        Close
      </h3>
    </div>
  )
}
