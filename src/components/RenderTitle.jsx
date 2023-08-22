import React from 'react';

const StyledSentence = ({ sentence,color }) => {
  const parseSentence = (sentence) => {
    const parts = sentence.split(/<\/?[ci]>/);
    const styledParts = parts.map((part, index) => {
      if (index % 2 === 1) {
        const tag = sentence.charAt(parts[index - 1].length + 1); 
        return tag === 'c' ? (
          <span key={index} style={{ color: color }}>
            {part}
          </span>
        ) : (
          <span key={index} style={{ fontStyle: 'italic' }}>
            {part}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });

    return styledParts;
  };

  return <div>{parseSentence(sentence)}</div>;
};

export default StyledSentence;
