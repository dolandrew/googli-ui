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
        fetch("http://googli-apparatus-434501925.us-east-2.elb.amazonaws.com:8080/api/search/lyrics?filter=" + filter)
            .then(
                (result) => {
                    result.json().then((promise) => {
                        this.setState({songs: promise});
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
                    <h1>Googli Apparatus</h1>
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
