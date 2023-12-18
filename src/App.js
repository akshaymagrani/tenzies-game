import './App.css';
import Die from './Die';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  function allNewDie() {
    const keepNumber = [];
    for (let i = 0; i < 10; i++) {
      keepNumber.push({
          value : Math.floor(Math.random() * (6 - 1 + 1) + 1),
          isHeld: false,
          id: nanoid()
      });
    }
    console.log(keepNumber);
    return keepNumber;
  }
  const [keepNumber, setKeepNumber] = React.useState(allNewDie());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(function () {
    // teachers sol:
    const allHeld = keepNumber.every(die => die.isHeld); // returns true if all are same
    const firstValues = keepNumber[0].value;
    const allValues = keepNumber.every(die => die.value); // returns true if all are same
    if(allHeld && allValues) {
      setTenzies(true);
      console.log("You Won!");
      setKeepNumber(prevDie => prevDie.map(die =>
      die.isHeld ? 
        die : 
          {value : Math.floor(Math.random() * (6 - 1 + 1) + 1),
          isHeld: false,
          id: nanoid()}
      ))
    }    
    // my solution
    // keepNumber.map(die => 
    //   {
    //     die.isHeld ? i++ : i;
    //     die.value
    //   }

    // )
    // if (i === 10) {
    //   return restart;
    // } else {
    //   console.log('not yet');
    // }
  }, [keepNumber]);

  // when user clicks Roll, freeze the number.
      // store the current number value, id of dies with that number to local storage and keep updating from there on Roll click.
  // when user clicks Roll, change bg to green.
  // when all die are same number, remove Roll and add new button to restart a game.

  function rollDice() {
    if(!tenzies){
      // setKeepNumber(allNewDie())
      setKeepNumber(prevDie => prevDie.map(die =>
        die.isHeld ? 
          die : 
            {value : Math.floor(Math.random() * (6 - 1 + 1) + 1),
            isHeld: false,
            id: nanoid()}
      ))
    } else{
      setTenzies(false);
      setKeepNumber(allNewDie());
    }
  }

  function holdDice(id){
    setKeepNumber(prevDie => 
      prevDie.map(die => 
        die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
        )
    )
  }

  return (
    <main className='App bg-slate-100 w-2/4 h-2/4 flex flex-col justify-center align-middle self-center p-4 m-auto rounded'>
      <div className='text-center '>
        <h1 className='text-3xl font-thin'>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='flex justify-center align-middle p-10 flex-wrap'>
        {keepNumber.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} handleClick={() => holdDice(die.id)}/> )}
      </div>
      <button className='bg-purple-700 px-5 py-1 rounded text-white shadow w-20 self-center hover:bg-purple-500 cursor-pointer' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies ? <Confetti />: ""}
    </main>
  );
}

export default App;
