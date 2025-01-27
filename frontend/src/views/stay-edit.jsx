import { useEffect, useState } from "react"
import { AppHeader } from "../cmps/app-header"
import { stayService } from "../services/stay.service"
import { useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { StayForm } from "../cmps/stay-edit-cmps/stay-form"

const StayEdit = () => {
  const { stayId } = useParams()
  const [stay, setStay] = useState()

  useEffect(() => {
    fetchStay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stayId])

  const fetchStay = async () => {
    try {
      const fetchedStay = await stayService.getById(stayId)
      setStay(fetchedStay)

    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (fields,images) => {
    const cleandField = {}
    Object.keys(fields).forEach((key) => (cleandField[key] = fields[key].value))
    try {
      await stayService.updateStay(stayId, cleandField)
      showSuccessMsg("Updated stay succesfully")
    } catch (error) {
      showErrorMsg(error)
    }
  }

  return (
    <>
      <AppHeader />
      <main className="stay-edit-container become-host-layout">
        {stay && <StayForm stay={stay} onSubmit={onSubmit} isAdd={false}></StayForm>}
      </main>
    </>
  )
}

export default StayEdit