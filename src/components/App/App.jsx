import React, {Component} from "react";
import logo from "./phish-logo.png";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

import Search from "./Search/Search";

export default class App extends Component {
    state = {
        query: "",
        songs: [{}],
        uuid : uuidv4()
    };

    updateSearchQuery = e => {
        this.setState({query: e.target.value},
            () => this.search());
    };

    search() {
        var filter = this.state.query;
        var uuid = this.state.uuid;
        this.setState({songs: null});
        fetch("https://googli-apparatus-backend.herokuapp.com/api/search/lyrics?uuid=" + uuid + "&filter=" + filter)
            .then(
                (result) => {
                    result.json().then((result) => {
                        this.setState({songs: result.songs});
                    })
                },
                (error) => {
                    console.log(error)
                }
            )

    };

    componentWillMount() {
        this.search();
    }

    render() {
        return (
            <div>
                <form className="App"
                      onSubmit={e => { e.preventDefault(); }}>
                    <img alt="Questions, ideas, or bugs? Email dolandrew@gmail.com or go to github.com/dolandrew. Enjoy!"
                         title="Questions, ideas, or bugs? Email dolandrew@gmail.com or go to github.com/dolandrew. Enjoy!"
                         className="App-logo"
                         src={logo}/>
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
