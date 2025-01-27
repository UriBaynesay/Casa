import { useSelector } from "react-redux"
import { AppHeader } from "../cmps/app-header"
import { StayForm } from "../cmps/stay-edit-cmps/stay-form"
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../services/event-bus.service"
import { stayService } from "../services/stay.service"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const StayAdd = () => {
  const { user } = useSelector((storeState) => storeState.userModule)
  const navigate = useNavigate()
  const mockStay = {
    name: "",
    summary: "",
    interaction: "",
    address: {
      street: "",
      city: "",
      country: "",
    },
    houseRules: "",
    propertyType: "",
    roomType: "",
    bedType: "",
    cancellationPolicy: "",
    capacity: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    price: 0,
    securityDeposit: 0,
    amenities: [],
    imgUrls: [],
  }
  useEffect(() => {
    if (!user) {
      showUserMsg("Please login to access this page")
      navigate("/login")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const onSubmit = async (form) => {
    const cleandField = new FormData(form)
    try {
      await stayService.addStay(cleandField)
      showSuccessMsg("Added stay succesfully")
    } catch (error) {
      showErrorMsg(error)
    }
  }
  return (
    <>
      <AppHeader />
      <main className="stay-edit-container">
        <StayForm stay={mockStay} onSubmit={onSubmit} isAdd={true}></StayForm>
      </main>
    </>
  )
}

export default StayAdd
