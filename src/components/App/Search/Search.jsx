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
            link: string,
            lyricSnippets: arrayOf(string)
        }))

    };

    listSongs() {
        if (this.props.songs.length > 0) {
            return this.props.songs.map(d =>
                <div className="result" key={d.link}>
                    <a href={d.link}>{d.name}</a>
                    <br/>
                    <span dangerouslySetInnerHTML={{__html: d.lyricSnippets}}></span>
                    <br/>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <input className="search-box" type="text" placeholder="search by word or phrase..." value={this.props.query} onChange={this.props.onChange}/>
                <input className="search-button" type="submit" value="Search" onClick={this.props.onClick}/>
                <br/>
                <br/>
                <div style={{paddingLeft: 35 + '%', paddingRight: 35 + '%'}} className="results>">
                    {this.listSongs()}
                </div>
            </div>
        );
    }
}
