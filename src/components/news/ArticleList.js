import React, { Fragment, useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import APIManager from '../module/APIManager';

export default props => {
    const [articles, setArticles] = useState([]);
    
    const getArticles = () => { 
        const userId = JSON.parse(localStorage.getItem("credentials")).userId;

        APIManager.get("users", `${userId}?_embed=articles`)
            .then(({ articles })=> setArticles(articles.reverse()));
    };

    useEffect(getArticles, []);

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