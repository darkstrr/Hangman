import React from 'react'

const Word = ({ generatedWord, correctLetters }) => {
  console.log(generatedWord);

  return (
    <div className="word">
      {generatedWord.split('').map((letter, i) => {
        return (
          <span className="letter" key={i}>
            {correctLetters.includes(letter) ? letter : ''}
          </span>
        )
      })}
    </div>
  )
}

export default Word