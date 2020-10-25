import React, { useState } from "react";
import Axios from "axios";
import "./normalize.css";
import "./skeleton.css";
//import logo from './logo.svg';
//import './App.css';

function App() {
  const [query, setQuery] = useState("");
  const url =
    "https://newsapi.org/v2/everything?q=${query}&apiKey=7a24ab3bcf634857bbdd7a59206a6778";

  const getData = async () => {
    const result = await Axios.get(url);
    console.log(result);
    setQuery("");
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };
  return (
    <div className="App">
      <h1 onClick={getData}> News</h1>
      <form className="search-bar" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search News"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default App;
