import React, {useEffect} from "react";
import feedDetailsPageStyles from './feed-details-page.module.css'
import FeedDetails from "../../components/feed-details/feed-details";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    WS_AUTH_CONNECTION_CLIENT_CLOSED,
    WS_AUTH_CONNECTION_START,
    WS_CONNECTION_CLIENT_CLOSED,
    WS_CONNECTION_START
} from "../../services/actions/web-socket";
import {CLOSE_FEED_DETAILS, OPEN_FEED_DETAILS} from "../../services/actions/feed-details";
import {useLocation} from "react-router-dom";
import {getCookie} from "../../services/utils";

export default function FeedDetailsPage() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const location = useLocation();
    const {messages} = useSelector(state => state.ws)
    const {isOpenDetails} = useSelector(state => state.feedDetails)

    useEffect(() => {
        if (location.pathname === `/feed/${id}`) {
            dispatch({
                type: WS_CONNECTION_START
            })
        }
        if (location.pathname === `/profile/orders/${id}`) {
            dispatch({
                type: WS_AUTH_CONNECTION_START,
                payload: `?token=${getCookie('accessToken')}`
            })
        }
        return (() => {
                if (location.pathname === `/feed/${id}`) {
                    dispatch({
                        type: WS_CONNECTION_CLIENT_CLOSED
                    })
                }
                if (location.pathname === `/profile/orders/${id}`) {
                    dispatch({
                        type: WS_AUTH_CONNECTION_CLIENT_CLOSED
                    })
                }
            }
        )
    }, [dispatch])

    useEffect(() => {
        if (messages) {
            dispatch({
                type: OPEN_FEED_DETAILS,
                order: messages.orders.find(item => item.number === Number(id))
            })
        }
        return () => {
            dispatch({
                type: CLOSE_FEED_DETAILS
            })
        }
    }, [dispatch, messages])

    return (isOpenDetails &&
        <section className={`${feedDetailsPageStyles.main}`}>
            <FeedDetails/>
        </section>
    )
}