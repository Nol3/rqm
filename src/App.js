import React, { useState, useEffect } from 'react';
import './App.scss';

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"


function App() {
  const [quote, setQuote] = useState("Work is 10% what happens to me and 90% of how I react to it.");
  const [author, setAuthor] = useState("Charles Swindoll");
  const [randomNumber, setRandomNumber] = useState(0);

  const [quotesArr, setQuotesArr] = useState (null)

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArr(parsedJSON.quotes)
    console.log(parsedJSON)
  }
  
  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [])

  const SetRandomQuote = () => {
    let randomInteger = Math.floor(quotesArr.length * Math.random())
    setRandomNumber(randomInteger)
    setQuote(quotesArr[randomInteger].quote)
    setAuthor(quotesArr[randomInteger].author)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box">
        <h1>Quote: {randomNumber}</h1>
          <p id="text">
          "{quote}"
          </p>
          <p id="author">
          - {author}
          </p>
          <a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>Tweet Quote</a>
          <button id="new-quote" onClick={()=> SetRandomQuote()} >Random Quote</button>
        </div>
      </header>
    </div>
  );
}

export default App;
