import React from 'react';
import FlipMove from 'react-flip-move';
import Suggestion from './Suggestion';

export default function SuggestionList ({suggestions, onPlusOne}) {
    return (
      <FlipMove className="SuggestionList">
        {suggestions.map((s, i) => <Suggestion key={s.id} {...s} onPlusOne={() => onPlusOne(s.id)}/>)}
      </FlipMove>
    );
}
