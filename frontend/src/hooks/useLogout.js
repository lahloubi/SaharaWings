import { useAuthContext } from './useAuthContext'
import { useVolsContext } from './useVolsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: volsDispatch } = useVolsContext()
    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        volsDispatch({type: 'SET_VOLS', payload: null})


    }

    return {logout}
}