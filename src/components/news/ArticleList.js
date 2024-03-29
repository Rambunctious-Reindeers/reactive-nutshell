// Author: Manila Bui
// Author: Sullivan Pierce | friends in articles
import React, { Fragment, useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import APIManager from '../module/APIManager';

export default props => {
    const [articles, setArticles] = useState([]);
    
    const getArticles = () => { 
        props.buildFriendsList()
            .then((friends) => {
                APIManager.getAll("articles")
            .then(articles => {
                friends.push(props.getUserId())
                const articlesFiltered = articles.filter(article => friends.includes(article.userId))
                setArticles(articlesFiltered.reverse())})
        })
    };

    useEffect(getArticles, [articles]);

    const deleteArticle = id => {
        APIManager.delete("articles", id)
            .then(() => getArticles);
    };

    const articlesArr = articles.map(article => {
        return (
            <ArticleCard
                key={article.id}
                article={article}
                deleteArticle={deleteArticle}
                {...props}
            />
        );
    });

    return (
        <Fragment>
            <div 
                className="dim pointer ma3 ph4 blue"
                onClick={() => props.history.push("/articles/new")}>
                    Create New Article
            </div>
            <hr />
            <div className="container-cards ma3 ph4 w-80">
                {articlesArr}
            </div>
        </Fragment>
    );
};