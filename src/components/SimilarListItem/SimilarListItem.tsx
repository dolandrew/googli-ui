import React from "react";
import SimilarResult from "../../interfaces/SimilarResult";

interface Props {
  index: number;
  result: SimilarResult;
  searchSimilar: (similarSong: string) => void;
  textTheme: string;
}

const SimilarListItem = ({index, result, searchSimilar, textTheme}: Props) => {

  return (
    <div style={{display: 'inline', justifyContent: 'center'}}>
    <span
      key={index}
      style={{listStyleType: 'none', color: textTheme, paddingRight: '4px'}}
      onClick={() => searchSimilar(result.title)}
    >
      {result.title} ({result.count})
    </span>

    </div>
  );
}

export default SimilarListItem;
