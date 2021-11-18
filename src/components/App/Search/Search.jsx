import React, {Component} from "react";
import {DebounceInput} from "react-debounce-input";
import "./Search.css";
import {arrayOf, func, shape, string, bool} from "prop-types";

export default class Search extends Component {
    static propTypes = {
        query: string.isRequired,
        onChange: func.isRequired,
        onClick: func.isRequired,
        songs: arrayOf(shape({
            title: string,
            link: string,
            lyricSnippets: arrayOf(string)
        })),
        searching: bool,
      textTheme: string

    };



    listSongs() {
        if (this.props.songs && this.props.songs.length > 0 && this.props.query.length > 0) {
            return this.props.songs.map(d =>
                <div className="result" style={{color: this.props.textTheme}}key={d.link}>
                    <a href={d.link} target="_blank" rel="noopener noreferrer">{d.name}</a>
                    <br/>
                    <span className="lyrics" dangerouslySetInnerHTML={{__html: d.lyricSnippets}}></span>
                    <br/>
                </div>
            );
        }
    }

    printResultCount() {
        if (this.props.query && this.props.songs) {
            if (this.props.songs.length > 1) {
                return (
                    <div style={{color: this.props.textTheme}}>{this.props.songs.length} results</div>
                )
            } else if (this.props.songs.length > 0) {
                return (
                    <div style={{color: this.props.textTheme}}>{this.props.songs.length} result</div>
                )
              } else if (this.props.songs.length == 0) {
                return (
                    <div style={{color: this.props.textTheme}}>no results</div>
                )
            }
        }
    }

    render() {
        return (
            <div>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={800}
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
