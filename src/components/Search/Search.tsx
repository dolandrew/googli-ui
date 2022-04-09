import React, { useState } from 'react';
import Song from "../../interfaces/Song";
import SimilarResult from "../../interfaces/SimilarResult";
import { DebounceInput } from "react-debounce-input";
import SimilarListItem from "../SimilarListItem/SimilarListItem";
import "./Search.css";

interface Props {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (query: string) => void;
  searchSimilar: (query: string) => void;
  songs: Song[];
  searched: string;
  time: string;
  textTheme: string;
  linkStyles: string;
  similarResults: SimilarResult[],
}

const Search = (props: Props) => {
  const { query, onChange, onClick, searchSimilar, songs, searched, time, textTheme, linkStyles, similarResults} = props;
  const [showFullSimilar, setShowFullSimilar] = useState<boolean>(false);

  const listSongs = () => {
    if (songs && songs.length > 0 && query.length > 0) {
      return songs.map(d =>
        <div
          className="result"
          style={{color: textTheme}}
          key={d.link}
          data-testid="song-list"
        >
          <a style={{color: linkStyles}} href={d.link} target="_blank" rel="noopener noreferrer">{d.name}</a>
          <br/>
          <span className="lyrics" dangerouslySetInnerHTML={{__html: d.lyricSnippets}}></span>
          <br/>
        </div>
      );
    }
  }

  const printResultCount = () => {
    if (query && searched === "true") {
      if (songs.length > 1) {
        return (
          <div
            data-testid='song-count'
            style={{color: textTheme}}
          >
            {songs.length} results in {time}s
          </div>
        )
      } else if (songs.length > 0) {
        return (
          <div
            data-testid='song-count'
            style={{color: textTheme}}
          >
            {songs.length} result in {time}s
          </div>
        )
      } else if (songs.length == 0) {
        return (
          <div
            data-testid='song-count'
            style={{color: textTheme}}
          >no results in {time}s
          </div>
        )
      }
    }
  }

  const toggleFullSimilar = () => {
    setShowFullSimilar(!showFullSimilar);
  }

  const displayedSimilarResults = () => {
    const results = similarResults.map((result, index) => (
      <SimilarListItem
        index={index}
        result={result}
        textTheme={textTheme}
        searchSimilar={searchSimilar}
      />
    ))

    return (
      <div>
        {results}
        <p onClick={() => toggleFullSimilar()}>Show less</p>
      </div>
    )
  }

  const someSimilarResults = () => {
    const topResult = similarResults.filter((r, i) => i <= 2).map((result, index) => (
      <SimilarListItem
        index={index}
        result={result}
        textTheme={textTheme}
        searchSimilar={searchSimilar}
      />
    ))

    return (
      <div>
        {topResult}
        {topResult.length > 0 && <span onClick={() => toggleFullSimilar()}>See More</span>}
      </div>
    )
  }

  return (
    <div>
      <DebounceInput
        data-testid="search-input"
        minLength={2}
        debounceTimeout={800}
        className="search-box"
        type="text"
        placeholder="type a word or phrase..."
        value={query}
        onChange={onChange}
      />
      <div style={{paddingTop: '2%', display: 'inline'}}>
        {/*{this.displayedSimilarResults()}*/}
        {/*{someSimilarResults()}*/}
        {showFullSimilar ? displayedSimilarResults() : (<div>{someSimilarResults()}</div>)}
      </div>
      <br/><br/>
      <div style={{paddingLeft: '33%', paddingRight: '33%'}} className="results>">
        {printResultCount()}
        {listSongs()}
      </div>
    </div>
  );
}

export default Search;
