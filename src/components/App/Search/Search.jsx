import React, {Component} from "react";
import "./Search.css";
import {arrayOf, func, shape, string} from "prop-types";

export default class Search extends Component {
    static propTypes = {
        query: string.isRequired,
        onChange: func.isRequired,
        onClick: func.isRequired,
        songs: arrayOf(shape({
            title: string,
            link: string
        }))

    };

    listSongs() {
        if (this.props.songs.length > 0) {
            return this.props.songs.map((d) => <ul key={d.link}><a key={d.link} href={d.link}>{d.name}</a></ul>);

        }
    }

    render() {
        return (
            <div>
                <label>
                    <input
                        type="text"
                        value={this.props.query}
                        onChange={this.props.onChange}
                    />
                </label>
                <br/>
                <input type="submit" value="Search Lyrics" onClick={this.props.onClick}/>
                {this.listSongs()}
            </div>
        );
    }
}
