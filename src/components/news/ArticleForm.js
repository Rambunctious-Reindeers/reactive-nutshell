import React, { Component, Fragment } from 'react'
import APIManager from '../module/APIManager';

const userId = localStorage.getItem("userId");

export default class ArticleForm extends Component {
    state = {
        title: "",
        url: "",
        synopsis: "",
        timestamp: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }

    constructNewArticle = evt => {
        const { title, url, synopsis } = this.state;

        evt.preventDefault();
        if (title === "" || url === "" || synopsis === "") {
            window.alert("Please enter a title, synopsis and url!")
        } else {
            this.setState({ loadingStatus: true });
            const article = { userId, title, url, synopsis, timestamp: Date()};

            APIManager.post("articles", article)
                .then(() => this.props.history.push("/articles"));
        };
    }

    updateExistingArticle = evt => {
        const { title, synopsis, url } = this.state;
        const id = this.props.match.params.articleId;

        evt.preventDefault();
        this.setState({ loadingStatus: true });

        const editedArticle = { title, synopsis, url };

        APIManager.patch("articles", id, editedArticle)
            .then(() => this.props.history.push("/articles"));
    }

    componentDidMount(){
        if(!this.props.isNew) {
            const articleId = this.props.match.params.articleId;

            APIManager.get("articles", articleId)
                .then(article => {
                    const { title, synopsis, url } = article;

                    this.setState({ title, synopsis, url, loadingStatus: false });
                });
        }
    }

    render() {
        return (
            <Fragment>
                <form className="ph5 pt4 pb5 mt5 ml4 br3 shadow-1 w-40">
                    <fieldset>
                        <label className="f6 b db mb2" htmlFor="title">Title</label>
                        <input
                            className="w-100"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="title"
                            placeholder="Article title"
                            value= {this.state.title}
                        />
                    </fieldset>
                    <fieldset>
                        <label className="f6 b db mb2" htmlFor="synopsis">Synopsis</label>
                        <input
                            className="w-100"
                            type="textarea"
                            required
                            onChange={this.handleFieldChange}
                            id="synopsis"
                            placeholder="Article synopsis"
                            value= {this.state.synopsis}
                        />
                    </fieldset>
                    <fieldset>
                        <label className="f6 b db mb2" htmlFor="url">Url</label>  
                        <input
                            className="w-100"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="url"
                            placeholder="Article url"
                            value= {this.state.url}
                        />
                    </fieldset>
                    <button
                        className="f6 fw5 bg-white orange hover-blue link pointer pa2 pv1 mt2 mb3 mr3 fr br2"
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.props.isNew ? this.constructNewArticle : this.updateExistingArticle}>
                            Submit
                    </button>
                </form>
            </Fragment>
        )
    }
};