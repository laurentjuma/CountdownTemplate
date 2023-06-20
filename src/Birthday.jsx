import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import githubLogo from './githubLogo.svg';
import { Link } from 'react-router-dom';

const Birthday = ({ name, day, month }) => {
  // useState Hooks
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isOxygenFinished: false,
  });

  if (name === undefined || day === undefined || month === undefined) {
    // This is if not enough params are provided
    name = 'Oxygen'; // Name of the Person
    month = 0; // Month of the Birthday
    day = 0; // Day of the Birthday
  }

  // get current time
  const currentTime = new Date();
  // get current year
  const currentYear = currentTime.getFullYear();

  // Getting the Birthday in Data Object
  // WE subtract 1 from momnth ; Months start from 0 in Date Object
  // Bithday Boolean
  const O2Finished =
    currentTime.getDate() === day && currentTime.getMonth() === month - 1;

  useEffect(() => {
    setInterval(() => {
      const countdown = () => {
        // Getting the Current Date
        const dateAtm = new Date();

        // if the Birthday has passed
        // then set the Birthday countdown for next year
        let birthdayDay = new Date(currentYear, month - 1, day);
        if (dateAtm > birthdayDay) {
          birthdayDay = new Date(currentYear + 1, month - 1, day);
        } else if (dateAtm.getFullYear() === birthdayDay.getFullYear() + 1) {
          birthdayDay = new Date(currentYear, month - 1, day);
        }

        // Getitng Current Time
        const currentTime = dateAtm.getTime();
        // Getting Birthdays Time
        const birthdayTime = birthdayDay.getTime();

        // Time remaining for the Birthday
        const timeRemaining = birthdayTime - currentTime;

        var startTime = 1687057200000;

        var endTime = startTime + 96 * 60 * 60 * 1000;
        var timeLeft = endTime - new Date().getTime();  

        let seconds = Math.floor(timeLeft / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);



        // let seconds = Math.floor(timeRemaining / 1000);
        // let minutes = Math.floor(seconds / 60);
        // let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        // hours %= 24;

        // Setting States
        setState((prevState) => ({
          ...prevState,
          seconds,
          minutes,
          hours,
          days,
          isOxygenFinished: O2Finished,
        }));
        // console.log(`${days}:${hours}:${minutes}:${seconds} , ${isItBday}`);
      };
      if (!O2Finished) {
        countdown();
      } else {
        setState((prevState) => ({
          ...prevState,
          isOxygenFinished: true,
        }));
      }
    }, 1000);
  }, [currentYear, day, O2Finished, month]);

  return (
    <div className='page'>
      <Countdown countdownData={state} name={name} />
      {!O2Finished && (
        <>
          {/* <div className='credits'>
            <a href='https://laurentj.netlify.app'>
              <img src={githubLogo} alt='Github-Logo' className='github-logo' />
            </a>
          </div> */}
          <Link to='/'>Don't lose hope!</Link>
        </>
      )}
    </div>
  );
};

export default Birthday;
