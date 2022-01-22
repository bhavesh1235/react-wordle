import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

 const  WordRow = (props) => {
  const { rowNum, maxWordLength } = props;

  let squares = [];
  
  //gives starting index of every new word
  let startIndex = rowNum * maxWordLength;
  
  //gives ending index of every new word
  let endIndex = startIndex + maxWordLength - 1;
  
  let i = startIndex;
  while (i <= endIndex) {
    squares.push(
      <Col className="letterSquare pt-2" style={{ fontWeight: 600 }}>
        
      </Col>
    );

    i++;
  }

  return (<><Row>{ squares }</Row></>);
};

export default WordRow