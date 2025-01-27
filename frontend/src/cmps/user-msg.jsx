import { useEffect, useState } from "react"

import { eventBusService } from "../services/event-bus.service.js"

export const UserMsg = () => {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    let eventHandler = eventBusService.on("show-user-msg", (msg) => {
      setMsg(msg)
      setTimeout(() => {
        setMsg(null)
      }, 2000)
    })

    return () => {
      eventHandler()
    }
  }, [])

  return (
    msg && (
      <section className={"user-msg " + msg.type}>
        <button
          onClick={() => {
            setMsg({ msg: null })
          }}
        >
          x
        </button>
        <h4>{msg.txt}</h4>
      </section>
    )
  )
}
