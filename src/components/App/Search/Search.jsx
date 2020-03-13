import React, {Component} from "react";
import {DebounceInput} from "react-debounce-input";
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
                    <span className="lyrics" dangerouslySetInnerHTML={{__html: d.lyricSnippets}}></span>
                    <br/>
                </div>
            );
        }
    }

    printResultCount() {
        if (this.props.query) {
            if (this.props.songs.length > 0) {
                return (
                    <div>{this.props.songs.length} results</div>
                )
            } else {
                return (
                    <div>no results</div>
                )
            }
        }
    }

    render() {
        return (
            <div>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={400}
                    className="search-box"
                    type="text"
                    placeholder="type a word or phrase..."
                    value={this.props.query}
                    onChange={this.props.onChange}/>
                <br/><br/>
                <div style={{paddingLeft: 33 + '%', paddingRight: 33 + '%'}} className="results>">
                    {this.printResultCount()}
                    {this.listSongs()}
                </div>
            </div>
        );
    }
}
