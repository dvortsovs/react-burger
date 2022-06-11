import React from "react";
import feedDetailsPageStyles from './feed-details-page.module.css'
import FeedDetails from "../../components/feed-details/feed-details";

export default function FeedDetailsPage() {
    return (
        <section className={`${feedDetailsPageStyles.main}`}>
            <FeedDetails />
        </section>
    )
}