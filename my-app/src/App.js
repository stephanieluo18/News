import React, { useState } from "react";
import Axios from "axios";
import Article from "./Components/Article.js";
import "./normalize.css";
import "./skeleton.css";
import { v4 as uuidv4 } from "uuid";
//import logo from './logo.svg';
import "./App.css";
//import { render } from "react-dom";
//import Filter from "./Components/Filter.js";
import Alert from "./Components/Alert.js";
import Select from "react-select";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState("");
  const [alert, setAlert] = useState("");
  const [dropdown, setDropdown] = useState({
    value: "general",
    label: "General",
  });
  const [sources, setSources] = useState("");
  let ids = [];

  //console.log(dropdown.value);
  const labels = [
    {
      value: "general",
      label: "General",
    },
    {
      value: "business",
      label: "Business",
    },
    {
      value: "entertainment",
      label: "Entertainment",
    },
    {
      value: "sports",
      label: "Sports",
    },
  ];
  //const [Filters, setFilters] = useState({
  // topic: [],
  //});

  //const source = `https://newsapi.org/v2/sources?apiKey=7a24ab3bcf634857bbdd7a59206a6778`;
  //getRequest
  //console.log(dropdown);
  const getData = async () => {
    const source = `https://newsapi.org/v2/sources?category=${dropdown.value}&apiKey=7a24ab3bcf634857bbdd7a59206a6778`;
    const response = await fetch(source);
    const data = await response.json();
    console.log(data.sources.length); //length of array
    console.log(data.sources[0].id); // should display id of the first array
    //fetch all possible ids and add it to sources of the url below

    const url = `https://newsapi.org/v2/everything?q=${query}&sources=buzzfeed,mashable&sortBy=publishedAt&apiKey=7a24ab3bcf634857bbdd7a59206a6778`;
    if (query === "") {
      return setAlert("Please type in a keyword");
    }
    const result = await Axios.get(url);
    //console.log(sources);
    //console.log(result.data.articles.title);
    if (result.data.totalResults === 0) {
      return setAlert("No articles found with such name");
    }
    setArticles(result.data.articles);
    console.log(dropdown.value); //displays dropdown value
    //console.log(result.data.articles);
    console.log(result);
    setAlert("");
    setQuery("");
  };

  //const addId

  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
    console.log("hello");
  };
  /** 
  const handleFilters = (filters, category) => {
    console.log(filters);
    const newFilters = { ...Filters };
    newFilters[category] = filters;
    setFilters(newFilters);
  };
  */

  const handleChange = (event) => {
    setDropdown(event);
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
        <Select value={dropdown} options={labels} onChange={handleChange} />
        <input type="submit" value="Search" />
      </form>
      <div className="articles">
        {articles != [] &&
          articles.map((article) => (
            <Article key={uuidv4()} article={article} />
          ))}
      </div>
    </div>
  );
}

//render(<App />, document.getElementById("root"));
export default App;
