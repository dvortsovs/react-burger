import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOrder} from "./booking-details";

export type TFeedDetailsOrder = Omit<TOrder, 'price' | 'owner' | 'ingredients'> & {
    ingredients: string[]
}

type TFeedDetailsState = {
    order: TFeedDetailsOrder | null;
    isOpenDetails: boolean;
}

const initialState: TFeedDetailsState = {
    order: null,
    isOpenDetails: false
}

const feedDetailsReducer = createSlice({
    name: 'feedDetails',
    initialState,
    reducers: {
        openFeedDetails(state, action: PayloadAction<TFeedDetailsOrder>) {
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