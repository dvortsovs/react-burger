import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TIngredient from "../../constants/ingredient";
import {TUser} from "./auth-provider";
import {getBookingDetails} from "../actions/booking-details";
import {isRequestError} from "../utils";

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
    bookingDetailsRequest: boolean;
    bookingDetailsRequestFailed: boolean;
    bookingDetailsVisible: boolean;
    errorStatus: number | null;
}

const initialState: TBookingDetailsState = {
    bookingDetails: null,
    bookingDetailsVisible: false,
    bookingDetailsRequest: false,
    bookingDetailsRequestFailed: false,
    errorStatus: null
}
const bookingDetailsReducer = createSlice({
    name: 'bookingDetails',
    initialState,
    reducers: {
        closeBookingDetails(state) {
            state.bookingDetails = null
            state.bookingDetailsVisible = false
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getBookingDetails.pending, (state) => {
                state.bookingDetailsRequest = true;
            })
            .addCase(getBookingDetails.fulfilled, (state, action) => {
                state.bookingDetailsRequest = false;
                state.bookingDetailsRequestFailed = false;
                state.errorStatus = null;
                state.bookingDetails = action.payload;
                state.bookingDetailsVisible = true;
            })
            .addMatcher(isRequestError, (state, action: PayloadAction<number>) => {
                state.bookingDetailsRequest = false;
                state.bookingDetailsRequestFailed = true;
                state.errorStatus = action.payload;
            })
    }
})

export default bookingDetailsReducer.reducer
export const {closeBookingDetails} = bookingDetailsReducer.actions