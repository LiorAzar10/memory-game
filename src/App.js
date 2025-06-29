import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card'


const emojis = ['🐸', '🐱', '🦁', '🐶', '🐼', '🐵', '🐯', '🐷'];
let busy = false;
let pairsCounter = 0;
let movesCounter = 0;

function App() {

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() })) 
    .sort((a, b) => a.sort - b.sort) 
    .map(({ value }) => value); 
}

   useEffect(() => {
    const doubled = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      value: emoji,
      isFlipped: false,
      isMatched: false
    }));

    const shuffled = shuffleArray(doubled);
    setCards(shuffled);
  }, []);

  
  const handleCardClick =  (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    if (clickedCard.isFlipped || clickedCard.isMatched || selectedCards.length === 2) return;
    if(busy) return;
    
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );

    const newSelected = [...selectedCards, clickedCard];

     setCards(updatedCards);
     setSelectedCards(newSelected);

     if (newSelected.length === 2) {
      movesCounter = movesCounter+1;
      busy = true;

      const [first, second] = newSelected;
      if(first.value === second.value){
          setCards(cards.map((card) =>
            card.value === first.value
              ? { ...card, isMatched: true }
              : card
          ));
          setSelectedCards([]);
          pairsCounter = pairsCounter+1;
          busy = false;
      }
      else{
          setTimeout(() => {
          setCards(cards.map((card) =>
            (card.id === first.id || card.id === second.id)
              ? { ...card, isFlipped: false }
              : card
          ));
         busy = false;
        },1000);
         setSelectedCards([]);
      }

     }
    if(pairsCounter == emojis.length) {setGameWon(true)};

     setTimeout(() => {
    }, 500);

  }

  const resetGame = () => {
    const doubled = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      value: emoji,
      isFlipped: false,
      isMatched: false
    }));
    
    const shuffled = shuffleArray(doubled);
    setCards(shuffled);
    setSelectedCards([]);
    movesCounter = 0;
    pairsCounter = 0;
    setGameWon(false);
  }

  return (
    <div className="app">
      <h1>Memory Game🎴</h1>
      <div className="moves-counter">
        Moves: <strong>{movesCounter}</strong>
      </div>
      {gameWon && (
  <div className="victory-screen">
    <div className="trophy">🏆</div>
    <h2>victory!</h2>
    <p>🎉 Congratulations! You won the game in <strong>{movesCounter}</strong> moves!</p>
    <button className="restart-btn" onClick={resetGame}>
        🔄 Reset Game
  </button>
  </div>
)}
  <button className="restart-btn" onClick={resetGame}>
    🔄 Reset Game
  </button>
      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardClick(card.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
