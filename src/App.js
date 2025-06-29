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
     setTimeout(() => {
     if(pairsCounter == emojis.length)
     {
        alert(`victory! you won in ${movesCounter} movess`);
     }
    }, 500);

  }

  return (
    <div className="app">
      <h1>🎴 משחק זיכרון</h1>
      <div className="moves-counter">
        Moves: <strong>{movesCounter}</strong>
      </div>
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
