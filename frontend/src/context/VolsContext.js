import { createContext, useReducer } from "react";

export const VolsContext = createContext();

export const VolsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_VOLS':
            return {
                vols: action.payload
            }
        case 'CREATE_VOL':
            return {
                vols: [action.payload, ...state.vols]
            }
            case 'DELETE_VOL':
                return {
                    vols: state.vols.filter((v) => v._id !== action.payload._id)
                }
        default:
            return state
    }
}

export const VolsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(VolsReducer, {
        vols: null
    });

    return (
        <VolsContext.Provider value={{...state, dispatch }}>
            { children }
        </VolsContext.Provider>
    );
};
