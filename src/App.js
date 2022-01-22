import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";

import Notification from "./Notification";


const App = () => {
  
  // mid game notification
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");


  // final answer
  // const [answer, setAnswer] = useState(picked);

  //count of guess word
  const [guessesUsedCount, setGuessesUsedCount] = useState(0);

  const [victory, setVictory] = useState(false);
  const [failure, setFailure] = useState(false);

   //final victory or failure
  const [resultMessage, setResultMessage] = useState(null);

   //array of all letters typed till yet
  const [guessedLetterArray, setGuessedLetterArray] = useState([]);


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
