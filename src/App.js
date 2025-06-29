import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card'


const emojis = ['🐸', '🐱', '🦁', '🐶', '🐼', '🐵', '🐯', '🐷'];

function App() {

  const [cards, setCards] = useState([]);

   useEffect(() => {
    const doubled = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      value: emoji,
      isFlipped: false 
    }));

    const shuffled = [...doubled].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);


  return (
    <div className="app">
      <h1>🎴 משחק זיכרון</h1>
      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={true} 
            onClick={() => {}} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
