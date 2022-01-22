import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import answers from './answers.json'
import Container from "react-bootstrap/Container";
import WordRow from './WordRow'
import Notification from "./Notification";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};


//max count of word
const maxWordLength = 5;

//max count of rows
const maxGuessCount = 6;


const picked = answers[getRandomInt(0, answers.length)].split("");



const App = () => {

  const [answer, setAnswer] = useState(picked);

  // mid game notification
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");


  //count of guess word
  const [guessesUsedCount, setGuessesUsedCount] = useState(0);

  const [victory, setVictory] = useState(false);
  const [failure, setFailure] = useState(false);

   //final victory or failure
  const [resultMessage, setResultMessage] = useState(null);

   //array of all letters typed till yet
  const [guessedLetterArray, setGuessedLetterArray] = useState([]);

  let letterRows = [];
  let i = 0;

  while (i < maxGuessCount) {
    letterRows.push(
      <WordRow
        key={`guess-row-${i}`}
        rowNum={i}
        maxWordLength={maxWordLength}
      />
    );
    i++;
  }

  return (
    <Container
      fluid="sm"
      tabIndex={1}
      className="h-100 text-center  md-3 pt-lg-4 px-0 px-sm-4 topDiv"
    >
      <header className="d-sm-none d-md-block">
        <h5 className="mt-md-4 mt-lg-5">CodeFoster Presents</h5>
        <h1>
          Wordle <span style={{ color: "#ff7f50" }}>Play</span>
        </h1>
      </header> 

      <Container
        className="App"
        style={{ maxWidth: "480px", }}
      >
         <Row>
          <Col xs={12}>{letterRows}</Col>
        </Row>

        </Container>

      {/* <div className="mainDiv">
        <div className="App" style={{ maxWidth: "480px" }}>
          <Notification
            timeOut={2500}
            notificationVisible={notificationVisible}
            setNotificationVisible={setNotificationVisible}
            notificationMessage={notificationMessage}
          />
        </div>
      </div> */}


    </Container>
  );
};

export default App;
