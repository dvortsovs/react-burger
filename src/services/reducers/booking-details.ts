import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TIngredient from "../../constants/ingredient";
import {TUser} from "./auth-provider";

export type TOwner = TUser & {
    createdAt: string;
    updatedAt: string;
}

export type TOrder = {
    ingredients: TIngredient[];
    _id: string;
    status: string;
    name: string;
    number: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    owner: TOwner;
}

export type TBookingDetails = {
    success: boolean;
    name: string;
    order: TOrder;
}

type TBookingDetailsState = {
    bookingDetails: TBookingDetails | null;
    bookingDetailsVisible: boolean;
}

const initialState: TBookingDetailsState = {
    bookingDetails: null,
    bookingDetailsVisible: false
}
const bookingDetailsReducer = createSlice({
    name: 'bookingDetails',
    initialState,
    reducers: {
        bookingSuccess(state, action: PayloadAction<TBookingDetails>) {
            state.bookingDetails = action.payload
            state.bookingDetailsVisible = true
        },
        closeBookingDetails(state) {
            state.bookingDetails = null
            state.bookingDetailsVisible = false
        },
    }
})

export default bookingDetailsReducer.reducer
export const {bookingSuccess, closeBookingDetails} = bookingDetailsReducer.actions