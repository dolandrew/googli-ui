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
        this.setState({query: e.target.value},
            () => this.search());
    };

    search() {
        var filter = this.state.query;
        fetch("http://googli-apparatus-434501925.us-east-2.elb.amazonaws.com:8080/api/search/lyrics?filter=" + filter)
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
