// @ts-ignore
import React, {useState, useEffect} from "react";
// @ts-ignore
import logo from "./phish-logo.png";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

// @ts-ignore
import Search from "./Search/Search.jsx";
import Song from "../../interfaces/Song";
import GoogliResponse from "../../interfaces/GoogliResponse";

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);

  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    search();
  };

  const search = () => {
    const filter = query;
    const uuid = uuidv4();
    setSongs([]);
    fetch("https://googli-apparatus-backend.herokuapp.com/api/search/lyrics?uuid=" + uuid + "&filter=" + filter)
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
  }, [query]);

  return (
    <div>
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

export default App;
