import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import answers from './answers.json'
import Container from "react-bootstrap/Container";
import WordRow from './WordRow'
import Notification from "./Notification";
import validWords from './validWords.json'

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

  const endOfLine =
    guessedLetterArray.length &&
    guessedLetterArray.length % maxWordLength === 0 &&
    guessesUsedCount < Math.floor(guessedLetterArray.length / maxWordLength);

  //return true when we are on first block of every line
  const startOfLine =
    !guessedLetterArray.length ||
    (guessedLetterArray.length % maxWordLength === 0 &&
      guessesUsedCount >=
        Math.floor(guessedLetterArray.length / maxWordLength));



  useEffect(() => {
    window.onkeydown = (e) => {
      handleKeyDown(e.key);
    };
  });

  useEffect(()=>{
    console.log(guessedLetterArray)
  },[guessedLetterArray])

  const handleKeyDown = (key) => {
    if (key === "Enter") {
      handleEnter();
      return;
    }
    const isLetter =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(key) !==
      -1;
    if (isLetter && !endOfLine) {
      setGuessedLetterArray((guessedLetterArray) => [...guessedLetterArray, key.toUpperCase()]);
      return;
    }
    if (key === "Backspace") {
      if (startOfLine) {
        return;
      }

      let newInput = [...guessedLetterArray];
    newInput.pop();
    setGuessedLetterArray(newInput);
      return;
    }
  };


  const handleEnter = () => {
    if (!endOfLine) {
      setNotificationMessage("Not enough letters.");
      setNotificationVisible(true);
      return;
    }
    checkVictory();
  };


  const checkVictory = () => {
    let i = 0;
    let j = 0;
    while (i < guessedLetterArray.length) {
      let guess = [...guessedLetterArray].slice(i, i + maxWordLength);

      let guessWord = guess.join("").toLowerCase();

      //is called when not a valid word
      if (validWords.indexOf(guessWord) === -1) {
        let newGuesses = [...guessedLetterArray].slice(0, i);
        setGuessedLetterArray(newGuesses);
        setGuessesUsedCount(newGuesses.length / maxWordLength);
        setNotificationMessage(
          guessWord.toUpperCase() + " is not a valid word."
        );
        setNotificationVisible(true);
        return;
      }
      i += maxWordLength;
      j++;

      setGuessesUsedCount(guessesUsedCount + 1);
      if (answer.join() === guess.join()) {
        setVictory(true);
        setResultMessage(
          <p className="result-message pt-2 pb-3">
            You got the answer in {guessesUsedCount + 1} tries! Press Enter for
            a new word.
          </p>
        );
      } else if (j >= maxGuessCount) {
        setFailure(true);
        setResultMessage(
          <p className="result-message pt-2 pb-3">
            Sorry, the answer was "{answer.join("")}." Press Enter for a new
            word.
          </p>
        );
      }
    }
  };



  let letterRows = [];
  let i = 0;

  while (i < maxGuessCount) {
    letterRows.push(
      <WordRow
        key={`guess-row-${i}`}
        rowNum={i}
        maxWordLength={maxWordLength}
        active={guessedLetterArray.length - (endOfLine ? 1 : 0)}
        guessedLetterArray={guessedLetterArray}
        isWordGuessed={guessesUsedCount > i}
        victory={victory}
        answer={answer}


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
        <h1>Wordle <span style={{color:'#ff7f50'}}>Play</span></h1>
      </header>
      <div className="mainDiv">
      <div
        className="App"
        style={{ maxWidth: "480px", }}
      >
        <Row>
          <Col xs={12}>{letterRows}</Col>
        </Row>
        <Notification timeOut={2500}
        notificationVisible setNotificationVisible= {setNotificationVisible()} notificationMessage
        
        />
        {resultMessage && (
          <Row>
            <Col xs={12} className="p-0">
              {resultMessage}
            </Col>
          </Row>
        )}
      </div>

      <Container
        className="App rules"
        style={{ maxWidth: "480px", }}
      >
        <h2 className="heading">Rules</h2>
     <ol>
       <li>Once the game is loaded  you can begin typing your first guess.  When you are ready, press enter. </li>
       <li>If the cell becomes <span style={{color:"green"}}>green</span> that means the corresponsing letter is correct</li>
       <li>If the cell becomes <span style={{color:"#daa520"}}>orange</span>  that means the corresponsing letter is in wrong place</li>
       <li>If the cell becomes <span style={{color:"grey"}}>grey</span>  that means the corresponsing letter is not present</li>
       <li>You will get 6 trials to guess the correct word</li>

     </ol>
        
      </Container>
      </div>
    </Container>
  );
};

export default App;
