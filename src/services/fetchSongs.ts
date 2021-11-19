import GoogliResponse from "../interfaces/GoogliResponse";
import Song from "../interfaces/Song";

export default (setSongs: (songs: Song[]) => void, uuid: string, filter: string) => {
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
}
