export const FilterIconPreview = ({ iconFilter, handleSetFilter }) => {
  return (
    <div
      className="filter-container"
      onClick={() => handleSetFilter(iconFilter)}
    >
      <div className="icon-container">
        <img
          key={iconFilter}
          src={require(`../../assets/img/filters/${iconFilter}.jpg`)}
          alt=""
          loading="lazy"
        />
      </div>
      <span className="filter-name">{iconFilter}</span>
    </div>
  )
}
