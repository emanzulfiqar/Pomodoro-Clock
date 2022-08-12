//import logo from './logo.svg';
import './App.css';
import React from 'react';
//import { useState,useEffect } from 'react';

//Pomodoro Clock using React and Bootstrap
function App() {
  const initialTime = 25 * 60;
  const initialBreakLength = 5 * 60;
  const [session, setSession] = React.useState("Session");
  const [breakLength, setBreakLength] = React.useState(initialBreakLength);
  const [sessionLength, setSessionLength] = React.useState(initialTime);
  const [timeLeft, setTimeLeft] = React.useState(initialTime);
  const [isStarted, setIsStarted] = React.useState(false);

  React.useEffect(() => {
    let sessionTimer = null;
    let breakTimer = null;
    if (isStarted) {
      sessionTimer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
    } else if ((!isStarted && formattedTime(timeLeft) !== "00:00") || reset) {
      clearInterval(sessionTimer);
    }

    if (isStarted && formattedTime(timeLeft) === "00:00") {
      playSound();
      if (session === "Session") {
        setSession("Break");
        setTimeLeft(breakLength);
      } else if (session === "Break") {
        setSession("Session");
        setTimeLeft(sessionLength);
      }

      if (isStarted) {
        breakTimer = setInterval(() => {
          if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
          }
        }, 1000);
      } else if ((!isStarted && formattedTime(timeLeft) !== "00:00") || reset) {
        clearInterval(breakTimer);
      };
    }
    return () => clearInterval(sessionTimer);
  }, [isStarted, timeLeft]);

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const playSound = () => {
    const getSound = document.getElementById("beep");
    getSound.play();
  };

  const toggle = () => {
    setIsStarted(!isStarted);
  };

  const breakIncrement = () => {
    if (breakLength < 60 * 60) {
      setBreakLength(breakLength + 60);
    }
  };

  const breakDecrement = () => {
    if (breakLength > 60) {
      setBreakLength(breakLength - 60);
    }
  };

  const sessionIncrement = () => {
    if (sessionLength < 60 * 60) {
      setSessionLength(sessionLength + 60);
      setTimeLeft(sessionLength + 60);
    }
  };

  const sessionDecrement = () => {
    if (sessionLength > 60) {
      setSessionLength(sessionLength - 60);
      setTimeLeft(sessionLength - 60);
    }
  };

  const reset = () => {
    setBreakLength(initialBreakLength);
    setSessionLength(initialTime);
    setTimeLeft(initialTime);
    setIsStarted(false);
    setSession("Session");
    const sound = document.getElementById("beep");
    const stop = sound.pause();
    sound.currentTime = 0;
  };
  return (
    <div id="pomodoro-box" className="container text-center">
      <h1 id="title">Pomodoro Clock</h1>
      <div id="time-left">{formattedTime(timeLeft)}</div>
      <h3 id="timer-label">{session}</h3>
      <div className="row buttons-div">
        <button id="start_stop" className="btn color button" onClick={toggle}>
          {" "}
          {isStarted ? "Stop" : "Start"}{" "}
        </button>
        <button id="reset" className="btn color" onClick={reset}>
          {" "}
          Reset{" "}
        </button>
      </div>
      <br />
      <div className="row wells">
        <div id="break-label">
          <div className="col-xs-6">
            <div id="left-well" className="well">
              <h4>Break Length</h4>
              <div className="flex">
                <button
                  id="break-decrement"
                  className="btn color"
                  onClick={breakDecrement}
                >
                  -
                </button>
                <div id="break-length" className="">
                  {breakLength / 60}
                </div>
                <button
                  id="break-increment"
                  className="btn color"
                  onClick={breakIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="session-label">
          <div className="col-xs-6">
            <div id="left-well" className="well">
              <h4>Session Length</h4>
              <div className="flex">
                <button
                  id="session-decrement"
                  className="btn color"
                  onClick={sessionDecrement}
                >
                  -
                </button>
                <div id="session-length" className="">
                  {sessionLength / 60}
                </div>
                <button
                  id="session-increment"
                  className="btn color"
                  onClick={sessionIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <audio
        id="beep"
        preload="auto"
        src="https://www.soundjay.com/phone/sounds/telephone-ring-03a.mp3"
      />
    </div>
  );
}

export default App;



