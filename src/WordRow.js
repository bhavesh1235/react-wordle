import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

 const  WordRow = (props) => {
  const { rowNum, maxWordLength  , guessedLetterArray,active
} = props;

  let squares = [];
  
  //gives starting index of every new word
  let startIndex = rowNum * maxWordLength;
  
  //gives ending index of every new word
  let endIndex = startIndex + maxWordLength - 1;
  

  let i = startIndex;
  while (i <= endIndex) {
    const letter = guessedLetterArray[i];

    squares.push(
      <Col className={`letterSquare pt-2 ${active===i?"active":""}`} style={{ fontWeight: 600 }}
     
      >
        {letter}
      </Col>
    );

    i++;
  }

  return (<><Row>{ squares }</Row></>);
};

export default WordRow