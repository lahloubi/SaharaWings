import { VolsContext } from "../context/VolsContext"
import { useContext } from "react"

export const useVolsContext = () => {
    const context = useContext(VolsContext)

    if (!context) {
        throw Error
    }

    return context
}