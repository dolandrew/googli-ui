import React, {useState, useEffect} from "react";
// @ts-ignore
import logo from "../../images/phish-logo.png";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

// @ts-ignore
import Search from "./Search/Search.jsx";
import Song from "../../interfaces/Song";
import GoogliResponse from "../../interfaces/GoogliResponse";
import { DarkThemeIcon, LightThemeIcon } from "../../images";

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [theme, setTheme] = useState<string>('#FFFFFF');

  const toggleTheme = () => {
    if (theme === '#FFFFFF') {
      setTheme('#1E1E1E');
    }
    if (theme ==='#1E1E1E') {
      setTheme('#FFFFFF');
    }
  }

  let textTheme;

  theme === '#1E1E1E' ? textTheme = '#FFFFFF' : textTheme = '#1E1E1E'

  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    search();
  };

  const search = () => {
    const filter = query;
    const id = uuid;
    setSongs([]);
    fetch("https://googli-apparatus-backend.herokuapp.com/api/search/lyrics?uuid=" + id + "&filter=" + filter)
      .then(
        (response) => {
          response.json().then((result: GoogliResponse) => {
            setSongs(result.songs);
          })
        },
        (error) => {
          console.log(error);
        }
      );

  };

  useEffect(() => {
    search();
  }, [query])

  return (
    <div style={{background: theme}}>
      { theme === '#1E1E1E' ?
        <LightThemeIcon onClick={toggleTheme} />
        :
        <DarkThemeIcon onClick={toggleTheme} />
      }

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
          onChange={updateSearchQuery}
          onClick={search}
          songs={songs}
          textTheme={textTheme}
        />
      </form>
    </div>
  );
}

export default App;
