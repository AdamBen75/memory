import React from 'react';
import './Card.css';

export default function Card({ card, onClick }){
  const classes = ['mc-card'];
  if(card.flipped || card.matched) classes.push('flipped');
  return (
    <div className={classes.join(' ')} onClick={() => onClick(card)}>
      <div className="mc-card-inner">
        <div className="mc-card-front"/>
        <div className="mc-card-back">
          <img src={card.image} alt="card" />
        </div>
      </div>
    </div>
  )
}
