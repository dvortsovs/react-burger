import React from 'react';
import notFoundStyles from './not-found-page.module.css'

export default function NotFoundPage() {
    return (
        <h1 className={`${notFoundStyles.title} text text_type_main-large`}>Page Not Found</h1>
    )
}