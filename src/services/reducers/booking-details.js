import {createSlice} from "@reduxjs/toolkit";

const bookingDetailsReducer = createSlice({
    name: 'bookingDetails',
    initialState: {
        bookingDetails: {},
        bookingDetailsVisible: false
    },
    reducers: {
        bookingSuccess(state, action) {
            state.bookingDetails = {...action.payload}
            state.bookingDetailsVisible = true
        },
        closeBookingDetails(state) {
            state.bookingDetails = {}
            state.bookingDetailsVisible = false
        },
    }
})

export default bookingDetailsReducer.reducer
export const {bookingSuccess, closeBookingDetails} = bookingDetailsReducer.actions