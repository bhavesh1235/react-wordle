import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

 const  WordRow = (props) => {
  const { rowNum, maxWordLength  , guessedLetterArray,active
,isWordGuessed,victory,answer


} = props;

  let squares = [];
  
  //gives starting index of every new word
  let startIndex = rowNum * maxWordLength;
  
  //gives ending index of every new word
  let endIndex = startIndex + maxWordLength - 1;
  

  let i = startIndex;
  while (i <= endIndex) {
    const letter = guessedLetterArray[i];

    let result = null;


    //this is executed after we have entered whole word and presssed enter key
    if (letter && isWordGuessed) {

      //if char at right location
      if (letter === answer[i - startIndex]) {
          result = 'right-spot';
      }

      //if char is present in answer
      else if (answer.indexOf(letter) !== -1) {

        result= 'wrong-spot';

      }
      //if char is not present in answer
      else {
        result = 'no-spot';
      }
    }
    squares.push(
      <Col className={`letterSquare pt-2 ${result}${active===i && !victory?" active":""}`} 
      style={{ fontWeight: 600 }}
      >
        {letter}
      </Col>
    );

    i++;
  }

  return (<><Row>{ squares }</Row></>);
};

export default WordRow