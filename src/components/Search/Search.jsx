import React, {Component} from "react";
import {DebounceInput} from "react-debounce-input";
import "./Search.css";
import {arrayOf, func, shape, string} from "prop-types";
import SimilarListItem from "../SimilarListItem/SimilarListItem";

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
    similarResults: arrayOf(shape({})),
    searchSimilar: func.isRequired,
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

  displayedSimilarResults() {
    return this.props.similarResults.map((result, index) => (
      <SimilarListItem
        index={index}
        result={result}
        textTheme={this.props.textTheme}
        searchSimilar={this.props.searchSimilar}
      />
    ))
  }

  someSimilarResults() {
    const topResult = this.props.similarResults.filter((r, i) => i <= 2).map((result, index) => (
      <SimilarListItem
        index={index}
        result={result}
        textTheme={this.props.textTheme}
        searchSimilar={this.props.searchSimilar}
      />
    ))

    return (
      <div>
        {topResult}
        {topResult.length > 0 && <span onClick={() => this.displayedSimilarResults()}>See More</span>}
      </div>
    )
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
        <div style={{paddingTop: '2%', display: 'inline'}}>
          {/*{this.displayedSimilarResults()}*/}
          {this.someSimilarResults()}

        </div>
        <br/><br/>
        <div style={{paddingLeft: '33%', paddingRight: '33%'}} className="results>">
          {this.printResultCount()}
          {this.listSongs()}
        </div>
      </div>
    );
  }
}
