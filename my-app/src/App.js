import React, { useState } from "react";
import Axios from "axios";
import Article from "./Components/Article.js";
import "./normalize.css";
import "./skeleton.css";
import { v4 as uuidv4 } from "uuid";
//import logo from './logo.svg';
import "./App.css";
import { render } from "react-dom";
import Filter from "./Components/Filter.js";
import Alert from "./Components/Alert.js";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState("");
  const [alert, setAlert] = useState("");
  const [Filters, setFilters] = useState({
    topic: [],
  });

  const getData = async () => {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=7a24ab3bcf634857bbdd7a59206a6778`;
    if (query == "") {
      setAlert("Please type in a keyword");
    }
    const result = await Axios.get(url);
    if (result.data.totalResults == 0) {
      return setAlert("No articles found with such name");
    }
    setArticles(result.data.articles);
    console.log(result);
    setAlert("");
    setQuery("");
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
    console.log("hello");
  };

  const handleFilters = (filters, category) => {
    console.log(filters);
    const newFilters = { ...Filters };
    newFilters[category] = filters;
    setFilters(newFilters);
  };

  return (
    <div className="App">
      <h1 onClick={getData}> News</h1>
      <form className="search-bar" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search News"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="Search" />
      </form>
      <Filter handleFilters={(filters) => handleFilters(filters, "topic")} />
      <div className="articles">
        {articles != [] &&
          articles.map((article) => (
            <Article key={uuidv4()} article={article} />
          ))}
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root"));
export default App;
