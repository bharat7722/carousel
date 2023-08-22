import React from 'react';

const ColorText = ({ sentence }) => {
  if (!sentence) {
    return null;
  }

  const regex = /<c>(.*?)<\/c>|<i>(.*?)<\/i>/g;
  const parts = sentence.split(regex);
  return (
    <div>
      {parts.map((part, index) => {
        if (!part) {
          return null;
        } else if (part.startsWith("<c>") && part.endsWith("</c>")) {
          const coloredPart = part.replace(/<\/?c>/g, "");
          return (
            <span key={index} style={{ color: 'red' }}>
              {coloredPart}
            </span>
          );
        } else if (part.startsWith("<i>") && part.endsWith("</i>")) {
          const italicPart = part.replace(/<\/?i>/g, "");
          return (
            <span key={index} style={{ fontStyle: 'italic' }}>
              {italicPart}
            </span>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </div>
  );
};

export default ColorText;
