import {createSlice} from "@reduxjs/toolkit";

const feedDetailsReducer = createSlice({
    name: 'feedDetails',
    initialState: {
        order: null,
        isOpenDetails: false
    },
    reducers: {
        openFeedDetails(state, action) {
            state.isOpenDetails = true
            state.order = action.payload
        },
        closeFeedDetails(state) {
            state.isOpenDetails = false
            state.order = null
        }
    }
})

export default feedDetailsReducer.reducer
export const {closeFeedDetails, openFeedDetails} = feedDetailsReducer.actions