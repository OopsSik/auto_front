import {createSlice} from "@reduxjs/toolkit";

const popupSlice = createSlice({
    name: 'popup',
    initialState: {
        popups: []
    },
    reducers: {
        openPopup: (state, action) => {
           state.popups.push({id: Math.random().toString(), type: action.payload.type, text: action.payload.text, open: true})
        },
        closePopup: (state, action) => {
            state.popups.map((popup) =>
                (popup.id === action.payload.id) ? popup.open = false : popup)
        },
        removePopup: (state, action) => {
            state.popups = state.popups.filter(popup => popup.id !== action.payload.id)
        }
    }
})

export const {openPopup, closePopup, removePopup} = popupSlice.actions
export const popupReducer = popupSlice.reducer