import React, {useState, useEffect} from "react";
// @ts-ignore
import logo from "./phish-logo.png";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

// @ts-ignore
import Search from "./Search/Search.jsx";
import Song from "../../interfaces/Song";
import GoogliResponse from "../../interfaces/GoogliResponse";
import { Theme, makeStyles } from "@material-ui/core";
import { ThemeWrapper } from "../../theme/ThemeWrapper";

const useStyles = makeStyles(() => ({
  root : {
    background: '#FFFFFF'
  },
  dark: {
    background: '#1E1E1E',
  }

  //   dark: {
  //     background: '#1E1E1E',
  //   },
  // },
}));

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [theme, setTheme] = useState<string>('');

  const classes = useStyles();

  let backgroundColor;

  // if (query.length > 1) {
  //   setTheme('#1E1E1E');
  // } else {
  //   setTheme('#FFFFFF')
  // }

  // const toggleTheme = () => {
  //   if (theme === '') {
  //     setTheme('#1E1E1E')
  //   }
  //   if (theme === '#1E1E1E') {
  //     setTheme('#FFFFFF')
  //   }
  //   return theme;
  // }

  const toggleTheme = () => {
    if (theme === '' || '#FFFFFF') {
      setTheme('#1E1E1E');
    }
    if (theme ==='#1E1E1E') {
      setTheme('#FFFFFF');
    }
  }

  console.log(theme)

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
      <button onClick={toggleTheme}>Toggle mode</button>
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
        />
      </form>
    </div>
  );
}

export default ThemeWrapper(App);
