import React, {Component} from "react";
import {DebounceInput} from "react-debounce-input";
import "./Search.css";
import {arrayOf, func, shape, string, bool} from "prop-types";
import {Checkbox, FormControlLabel} from "@material-ui/core";

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
        searched: string.isRequired,
        time: string.isRequired,
      textTheme: string,
      linkStyles: string,
      toggleSimilarSearch: func.isRequired,
    };

    listSongs() {
        if (this.props.songs && this.props.songs.length > 0 && this.props.query.length > 0) {
            return this.props.songs.map(d =>
                <div
                  className="result"
                  style={{color: this.props.textTheme}}
                  key={d.link}
                  data-testid="song-list"
                >
                    <a style={{color: this.props.linkStyles}} href={d.link} target="_blank" rel="noopener noreferrer">{d.name}</a>
                    <br/>
                    <span className="lyrics" dangerouslySetInnerHTML={{__html: d.lyricSnippets}}></span>
                    <br/>
                </div>
            );
        }
    }

    printResultCount() {
        if (this.props.query && this.props.searched === "true") {
            if (this.props.songs.length > 1) {
                return (
                    <div
                      data-testid='song-count'
                      style={{color: this.props.textTheme}}
                    >
                      {this.props.songs.length} results in {this.props.time}s
                    </div>
                )
            } else if (this.props.songs.length > 0) {
                return (
                    <div
                      data-testid='song-count'
                      style={{color: this.props.textTheme}}
                    >
                      {this.props.songs.length} result in {this.props.time}s
                    </div>
                )
              } else if (this.props.songs.length == 0) {
                return (
                    <div
                      data-testid='song-count'
                      style={{color: this.props.textTheme}}
                    >no results in {this.props.time}s
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div>
                <DebounceInput
                    data-testid="search-input"
                    minLength={2}
                    debounceTimeout={800}
                    className="search-box"
                    type="text"
                    placeholder="type a word or phrase..."
                    value={this.props.query}
                    onChange={this.props.onChange}
                />
                <FormControlLabel control={
                  <Checkbox
                  label="Include similar results"
                  onChange={() => this.props.toggleSimilarSearch()}
                  style={{color: this.props.linkStyles}}
                  color="success"
                />}
                  label='Include similar results?'
                />
                <br/><br/>
                <div style={{paddingLeft: 33 + '%', paddingRight: 33 + '%'}} className="results>">
                    {this.printResultCount()}
                    {this.listSongs()}
                </div>
            </div>
        );
    }
}
