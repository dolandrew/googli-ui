import React from "react";
import SimilarResult from "../../interfaces/SimilarResult";
import Theme from "../../interfaces/Theme";

interface Props {
  index: number;
  result: SimilarResult;
  searchSimilar: (similarSong: string) => void;
  textTheme: string;
}

const SimilarListItem = ({index, result, searchSimilar, textTheme}: Props) => {

  return (
    <li
      key={index}
      style={{listStyleType: 'none', color: textTheme}}
      onClick={() => searchSimilar(result.title)}
    >
      The word {result.title} appears in {result.count} {result.count === 1 ? 'song': 'songs' }
    </li>
  );
}

export default SimilarListItem;
