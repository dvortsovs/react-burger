import React, {useEffect} from "react";
import feedDetailsPageStyles from './feed-details-page.module.css'
import FeedDetails from "../../components/feed-details/feed-details";
import {useParams} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {getCookie} from "../../services/utils";
import {closeFeedDetails, openFeedDetails} from "../../services/reducers/feed-details";
import {
    wsAuthConnectionClientClosed, wsAuthConnectionStart,
    wsConnectionClientClosed,
    wsConnectionStart
} from "../../services/reducers/web-socket";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

const FeedDetailsPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const location = useLocation();
    const {messages} = useAppSelector(state => state.ws)
    const {isOpenDetails} = useAppSelector(state => state.feedDetails)

    useEffect(() => {
        if (location.pathname === `/feed/${id}`) {
            dispatch(wsConnectionStart())
        }
        if (location.pathname === `/profile/orders/${id}`) {
            dispatch(wsAuthConnectionStart(`?token=${getCookie('accessToken')}`))
        }
        return (() => {
                if (location.pathname === `/feed/${id}`) {
                    dispatch(wsConnectionClientClosed())
                }
                if (location.pathname === `/profile/orders/${id}`) {
                    dispatch(wsAuthConnectionClientClosed())
                }
            }
        )
    }, [dispatch, id, location])

    useEffect(() => {
        if (messages) {
            const order = messages.orders.find((item) => item.number === Number(id))
            if (order)
            dispatch(openFeedDetails(order))
        }
        return () => {
            dispatch(closeFeedDetails())
        }
    }, [dispatch, messages, id])

    return (isOpenDetails ?
        <section className={`${feedDetailsPageStyles.main}`}>
            <FeedDetails/>
        </section> : null
    )
}

export default FeedDetailsPage