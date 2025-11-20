import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Title from './components/Title/Title';
import Card from './components/Card/Card';

import img1 from './morocco.png';
import img2 from './naruto.jpg';
import img3 from './gon-hunter-x-hunter.avif';
import img4 from './anime-my-hero-academia.webp';
import img5 from './Natsu-Dragneel-Fairy-Tail-pink-haired-anime-characters.webp';
import img6 from './yuji_itadori_jujutsu_kaisen.webp';

function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length -1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(){
  const images = [img1,img2,img3,img4,img5,img6];
  const cards = images.flatMap((img, idx) => ([
    { id: `${idx}-a`, image: img, matched: false },
    { id: `${idx}-b`, image: img, matched: false },
  ]));
  return shuffle(cards);
}

function App(){
  const [cards, setCards] = useState(() => buildDeck());
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disable, setDisable] = useState(false);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(()=>{
    if(cards.every(c => c.matched)){
      setWon(true);
    }
  },[cards]);

  function resetGame(){
    setCards(buildDeck());
    setFirst(null);
    setSecond(null);
    setDisable(false);
    setMoves(0);
    setWon(false);
  }

  function handleCardClick(card){
    if(disable) return;
    if(card === first) return;
    if(card.matched || card.flipped) return;

    const updated = cards.map(c => c.id === card.id ? {...c, flipped: true} : c);
    setCards(updated);

    if(!first){
      setFirst(card);
    } else if(!second){
      setSecond(card);
      setDisable(true);
      setMoves(m => m + 1);
      setTimeout(()=>{
        const firstCard = updated.find(c => c.id === first.id);
        const secondCard = updated.find(c => c.id === card.id);
        if(firstCard.image === secondCard.image){
          const matched = updated.map(c => (
            c.image === firstCard.image ? {...c, matched: true} : c
          ));
          setCards(matched);
        } else {
          const reverted = updated.map(c => (
            (c.id === first.id || c.id === card.id) ? {...c, flipped: false} : c
          ));
          setCards(reverted);
        }
        setFirst(null);
        setSecond(null);
        setDisable(false);
      }, 800);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <Title>Jeu Memory</Title>

        <div className="controls">
          <Button onClick={resetGame}>Relancer</Button>
          <div className="moves">Coups: {moves}</div>
        </div>

        <div className="grid">
          {cards.map(card => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>

        {won && (
          <div className="victory">
            Bravo ! Vous avez gagné en {moves} coups.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
