import Song from "./Song";
import SimilarResult from "./SimilarResult";

export default interface GoogliResponse {
  similarResults: SimilarResult[];
  songs: Song[];
}
