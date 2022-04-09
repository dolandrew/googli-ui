import React, {useState} from "react";
// @ts-ignore
import logo from "../../images/phish-logo.png";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

// @ts-ignore
import Search from "../Search/Search.tsx";
import Song from "../../interfaces/Song";
import GoogliResponse from "../../interfaces/GoogliResponse";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Theme from "../../interfaces/Theme";
import useThemeToggle from "../../services/useThemeToggle";
import SimilarResult from "../../interfaces/SimilarResult";
import SimilarListItem from "../SimilarListItem/SimilarListItem";

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [similarResults, setSimilarResults] = useState<SimilarResult[]>([]);
  const [time, setTime] = useState<string>('');
  const [searched, setSearched] = useState<string>('');
  const [theme, setTheme] = useState<Theme.BG_LIGHT | Theme.BG_DARK>(Theme.BG_LIGHT);

  const { textTheme, linkStyles } = useThemeToggle(theme);

  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    search(e.target.value);
  };

  const search = (query: string) => {
    const id = uuidv4();
    var beforeSearch = Date.now();
    setSongs([]);
    setSearched("");
    fetch("https://googli-apparatus-backend.herokuapp.com/api/search/lyrics?uuid=" + id + "&filter=" + query)
      .then(
        (response) => {
          response.json().then((result: GoogliResponse) => {
            var afterSearch = Date.now();
            setTime(((afterSearch - beforeSearch) / 1000).toString())
            setSongs(result.songs);
            setSearched("true");
            setSimilarResults(result.similarResults)
          })
        },
        (error) => {
          console.log(error);
        }
      );

  };

  const searchSimilar = (similarResult: string) => {
    setQuery(similarResult);
    search(similarResult);
  };

  const displayedSimilarResults = similarResults.map((result: SimilarResult, index: number) => (
    <SimilarListItem
      index={index}
      result={result}
      searchSimilar={searchSimilar}
      textTheme={textTheme}
    />
  ));

  return (
    <div style={{background: theme}}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <form className="App"
            onSubmit={e => { e.preventDefault(); }}>
        <img alt="Questions, ideas, or bugs? Email dolandrew@gmail.com or go to github.com/dolandrew. Enjoy!"
             title="Questions, ideas, or bugs? Email dolandrew@gmail.com or go to github.com/dolandrew. Enjoy!"
             className="App-logo"
             src={logo}
             data-testid="logo"
        />
        <br/>
        <br/>
        <Search
          query={query}
          searched={searched}
          time={time}
          onChange={updateSearchQuery}
          onClick={search}
          songs={songs}
          textTheme={textTheme}
          linkStyles={linkStyles}
          similarResults={similarResults}
          searchSimilar={searchSimilar}
        />
      </form>
    </div>
  );
}

export default App;
