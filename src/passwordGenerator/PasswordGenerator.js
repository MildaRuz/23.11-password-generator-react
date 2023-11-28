import { useEffect, useState } from 'react';

import styles from './PasswordGenerator.module.css';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '±!@#$%^&*()_+?.,';

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const passwordGenerator = (length, characters) => {
  let newPassword = '';
  for (let i = 0; i <= length - 1; i++) {
    newPassword += characters[rand(0, characters.length - 1)];
  }
  return newPassword;
};

function PasswordGeneratorRendering() {
  const [passLength, setPassLength] = useState(8);
  const [withNumbers, setWithNumbers] = useState(false);
  const [withSymbols, setWithSymbols] = useState(false);
  const [generatedPass, setGeneratedPass] = useState();
  const [tenGeneratedPass, setTenGeneratedPass] = useState([]);

  useEffect(() => {
    let characters = letters;
    if (passLength < 8 || passLength > 50) {
      return;
    }
    if (withNumbers) {
      characters += numbers;
    }
    if (withSymbols) {
      characters += symbols;
    }
    setGeneratedPass(passwordGenerator(passLength, characters));
  }, [passLength, withNumbers, withSymbols]);

  useEffect(() => {
    if (generatedPass) {
      setTenGeneratedPass((prev) => [generatedPass, ...prev].slice(0, 10));
    }
  }, [generatedPass]);

  const inputLength = (e) => {
    setPassLength(e.target.value);
  };

  const passWithNumbers = (e) => {
    setWithNumbers(e.target.checked);
  };

  const passWithSymbols = (e) => {
    setWithSymbols(e.target.checked);
  };

  const handleButtonClick = () => {
    let characters = letters;
    if (passLength < 8 || passLength > 50) {
      alert('Not enougth or too much characters');
      return;
    }
    if (withNumbers) {
      characters += numbers;
    }
    if (withSymbols) {
      characters += symbols;
    }
    setGeneratedPass(passwordGenerator(passLength, characters));
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Password Generator</h1>
        <div>Generated password:</div>
        <div className={styles.outputField}>{generatedPass}</div>
        <label htmlFor="password length">Choose password length </label>
        <input
          onChange={inputLength}
          value={passLength}
          name="password length"
          type="number"
          placeholder="8-50"
          min="8"
          max="50"
        ></input>
        <label htmlFor="symbols"> Symbols </label>
        <input
          onChange={passWithSymbols}
          value={withSymbols}
          className={styles.checkbox}
          type="checkbox"
          name="symbols"
        ></input>
        <label htmlFor="numbers"> Numbers </label>
        <input
          onChange={passWithNumbers}
          value={withNumbers}
          className={styles.checkbox}
          type="checkbox"
          name="numbers"
        ></input>
        <button
          onClick={() => {
            handleButtonClick();
          }}
        >
          Generate
        </button>
        <div>
          <h3>10 Last generated passwords:</h3>
          {tenGeneratedPass.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </div>
      </div>
    </>
  );
}

export default PasswordGeneratorRendering;
