import { TopRatedPreview } from "./top-rated-preview"

export const TopRatedList = ({ stays }) => {
  return (
    <div className="cards-container">
      {stays.map((stay, idx) => {
        return <TopRatedPreview stay={stay} key={idx} />
      })}
    </div>
  )
}
