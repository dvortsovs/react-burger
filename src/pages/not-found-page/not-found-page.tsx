import React from 'react';
import notFoundStyles from './not-found-page.module.css'

const NotFoundPage = () => {
    return (
        <h1 className={`${notFoundStyles.title} text text_type_main-large`}>Page Not Found</h1>
    )
}

export default NotFoundPage