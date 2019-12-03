import React, { Fragment, useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import APIManager from '../module/APIManager';

export default props => {
    const [articles, setArticles] = useState([]);
    
    const getArticles = () => { APIManager.getAll("articles").then(articles => setArticles(articles)) };

    useEffect(getArticles, []);

    const deleteArticle = id => {
        APIManager.delete("articles", id)
            .then(() => APIManager.getAll("articles")
                .then(articles => setArticles(articles))
            );
    };

    const articlesArr = articles.map(article => {
        console.log('sup')
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
            <section className="section-content">
                <button 
                    type="button"
                    className="btn"
                    onClick={() => props.history.push("/articles/new")}>
                        Add Article
                </button>
            </section>
            <div className="container-cards">
                {articlesArr}
            </div>
        </Fragment>
    );
};

// import React, { Component, Fragment } from 'react';
// import APIManager from '../module/APIManager';
// import ArticleCard from './ArticleCard';

// class ArticleList extends Component {
//     state = {
//         articles: [],
//     }

//     componentDidMount() {
//         APIManager.getAll("articles")
//             .then(articles => {console.log(this.state.articles); this.setState({ articles: articles.reverse() })})

        
//     }

//     deleteArticle = id => {
//         APIManager.delete("articles", id)
//             .then(() => APIManager.getAll("articles")
//                 .then(articles => this.setState({ articles }))
//             )
//     }

//     render() {
//         return (
//             <Fragment>
//                 <section className="section-content">
//                     <button
//                         type="button"
//                         className="btn"
//                         onClick={() => { this.props.history.push("/articles/new") }}>
//                             Add Article
//                     </button>
//                 </section>
//                 <div className="container-cards">
//                     {this.state.articles.map(article =>
//                         <ArticleCard
//                             key={article.id}
//                             article={article}
//                             deleteArticle={this.deleteArticle}
//                             {...this.props}
//                         />
//                     )}
//                 </div>
//             </Fragment>
//         )
//     }
// };

// export default ArticleList;