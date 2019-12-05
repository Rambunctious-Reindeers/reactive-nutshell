// Author: Manila Bui
import React from 'react';

export default ({ history, deleteArticle, article }) => {
    const { id, title, synopsis, timestamp, url, userId } = article;

    const getUserId = () => JSON.parse(localStorage.getItem("credentials")).userId;

    const editButton = 
        <div
            className="f3 fr mr3 pb4 gray hover-orange pointer"
            alt="Edit article"
            onClick={() => { history.push(`/articles/${id}/edit`) }}>
                &#x270E;
       </div>;

    const deleteButton =
        <div className="ttu fr grow pointer orange" onClick={() => deleteArticle(id)}>
            Delete article
        </div>;

    const cardContent =
        <section className="pv1">
            {getUserId() === userId ? editButton : null}
            <a
                className="ttu f4 fw6 dib black link hover-blue"
                target="_blank"
                rel="noopener noreferrer"
                href={url}>
                {title}
            </a>
            <p className="i f6">{synopsis}</p>
            <footer className="f7 fw6">
                <div className="dib mr3">{timestamp}</div>
                {getUserId() === userId ? deleteButton : null}
            </footer>
        </section>;

    const cardContainer = getUserId() === userId 
        ? <div>{cardContent}<hr/></div>
        : <div className="other-users">{cardContent}<hr/></div> ;

    return cardContainer;
};