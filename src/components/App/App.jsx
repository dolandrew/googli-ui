import React, {Component} from "react";
import logo from "./phish-logo.png";
import "./App.css";

import Search from "./Search/Search";

export default class App extends Component {
    state = {
        query: "",
        songs: [{}]
    };

    updateSearchQuery = e => {
        this.setState({query: e.target.value});
    };

    search = e => {
        e.preventDefault();
        var filter = this.state.query;
        fetch("http://localhost:8080/api/search/lyrics?filter=" + filter)
            .then(
                (result) => {
                    result.json().then((result) => {
                        this.setState({songs: result});
                    })
                },
                (error) => {
                    console.log(error)
                }
            )

    };

    render() {
        return (
            <div>
                <form className="App">
                    <img alt="" className="App-logo" src={logo}/>
                    <br/>
                    <br/>
                    <Search
                        query={this.state.query}
                        onChange={this.updateSearchQuery}
                        onClick={this.search}
                        songs={this.state.songs}
                    />
                </form>
            </div>
        );
    }
}
