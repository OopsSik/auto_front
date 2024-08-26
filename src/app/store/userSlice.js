import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        username: null,
        nickname: null,
        money: null,
        role: null
    },
    reducers: {
        signUser: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.nickname = action.payload.nickname
            state.money = action.payload.money
            state.role = action.payload.role
            if(action.payload.accessToken){
                localStorage.setItem('accessToken', action.payload.accessToken)
            }
        },
        logoutUser: (state) => {
            state.id = null
            state.username = null
            state.nickname = null
            state.money = null
            state.role = null
            localStorage.removeItem('accessToken')
        },
        updateMoney: (state, action) => {
            state.money = action.payload.money
        }
    }
})

export const {signUser, logoutUser, updateMoney} = userSlice.actions
export const userReducer = userSlice.reducer