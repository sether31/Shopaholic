import React from 'react'

export default function Capitalize({ word }) {
  if(word.length === 0) return word;
  const capWord = word.charAt(0).toUpperCase() + word.slice(1);

  return capWord;
}
