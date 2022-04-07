import React, {useState, useEffect} from "react";
// @ts-ignore
import logo from "../../images/phish-logo.png";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

// @ts-ignore
import Search from "../Search/Search.jsx";
import Song from "../../interfaces/Song";
import GoogliResponse from "../../interfaces/GoogliResponse";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Theme from "../../interfaces/Theme";
import useThemeToggle from "../../services/useThemeToggle";

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
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
          })
        },
        (error) => {
          console.log(error);
        }
      );

  };

  return (
    <div style={{background: theme}}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <form className="App"
            onSubmit={e => { e.preventDefault(); }}>
        <img alt="Questions, ideas, or bugs? Email dolandrew@gmail.com or go to github.com/dolandrew. Enjoy!"
             title="Questions, ideas, or bugs? Email dolandrew@gmail.com or go to github.com/dolandrew. Enjoy!"
             className="App-logo"
             src={logo}/>
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
        />
      </form>
    </div>
  );
}

export default App;
