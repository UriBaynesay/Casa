import { useNavigate, useParams } from "react-router-dom"
import { AppHeader } from "../cmps/app-header"
import { useEffect, useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { stayService } from "../services/stay.service"
import { StayDescription } from "../cmps/stay-details-cmps/stay-description"
import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

const StayDelete = () => {
  const { stayId } = useParams()
  const navigate = useNavigate()
  const [stay, setStay] = useState()

  const fetchStay = async () => {
    try {
      const fetchedStay = await stayService.getById(stayId)
      setStay(fetchedStay)
    } catch (error) {
      showErrorMsg(error)
      navigate("/")
    }
  }

  const onDelete = async () => {
    try {
      await stayService.deleteStay(stayId)
      showSuccessMsg("Stay deleted succesfully")
      navigate("/user/stays")
    } catch (error) {
      showErrorMsg(error)
    }
  }

  useEffect(() => {
    fetchStay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stayId])

  return (
    <>
      <AppHeader />
      <main className="stay-delete main-layout">
        <section className="stay-delete-container">
          {stay && (
            <>
              <div className="stay-main-info-container">
                <StayDescription stay={stay}></StayDescription>
              </div>

              <h2>Are you sure you want to delete this stay?</h2>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={onDelete}
              >
                Delete
              </Button>
            </>
          )}
        </section>
      </main>
    </>
  )
}

export default StayDelete