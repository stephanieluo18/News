import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/App.css";
import Alert from "./Components/Alert.js";
import Select from "react-select";
import Article from "./Components/Article.js";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState("");
  const [alert, setAlert] = useState("");

  /* dropdown defaults to general category */
  const [dropdown, setDropdown] = useState({
    value: "general",
    label: "General",
  });

  /* ids based on a specific category is populated here */
  const ids = [];

  /* Dropdown options for different categories*/
  const labels = [
    {
      value: "general",
      label: "General",
    },
    {
      value: "technology",
      label: "Technology",
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

  /* Defaults to Most recent articles*/
  const [sort, setSort] = useState({
    value: "publishedAt",
    label: "Most Recent",
  });

    /* Dropdown options for different options to sort*/
  const dates = [
    {
      value: "publishedAt",
      label: "Most Recent",
    },
    {
      value: "relevancy",
      label: "Most Relevant",
    },
    {
      value: "popularity",
      label: "Most Popular",
    },
  ];

  const getData = async () => {
    /* source url determines the possible related ids based on category */
    const source = `https://newsapi.org/v2/sources?category=${dropdown.value}&apiKey=78b9d599c4f94f8fa3afb1a5458928d6`;
    //const response = await fetch("https://cors-anywhere.herokuapp.com/"+source, {mode: 'cors'});
    const response = await fetch(source);
    const data = await response.json();
    //console.log(data);
    //console.log(data.sources.length); //length of array
    //console.log(data.sources[0].id); // should display id of the first array

    /* fetch all possible ids and add it to sources of the url below */
    for (let i = 0; i < data.sources.length; i++) {
      ids.push(data.sources[i].id); // array of the ids
    }

    /* x is the string representation of the id array */
    let x = "";

    /* sources can take only a max of 20 items so if category is general, there is no need to filter*/
    dropdown.value === "general" ? (x = "") : (x = ids.toString());

    /* main source to search for articles */
    const url = `https://newsapi.org/v2/everything?q=${query}&sources=${x}&sortBy=${sort.value}&pageSize=30&language=en&apiKey=78b9d599c4f94f8fa3afb1a5458928d6`;

    /* if user does not enter anything, alert message will show*/
    if (query === "") {
      return setAlert("Please type in a keyword");
    }
    //const result = await Axios.get("https://cors-anywhere.herokuapp.com/"+url, {mode: 'cors'});
    const result = await Axios.get(url);
    //console.log(sources);

    /* if no results show, alert message is displayed */
    if (result.data.totalResults === 0) {
      return setAlert("No articles found with such name");
    }
    setArticles(result.data.articles);
    setAlert("");
    //setQuery("");
  };

  /* query */
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  /* when search button is clicked */
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  /* handles the changes for the different categories */
  const handleChange = (event) => {
    setDropdown(event);
  };

  /* handles the changes for the different sorting methods */
  const handleSort = (event) => {
    setSort(event);
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Worldwide News</h1>
      </div>
      <form className="search-bar" onSubmit={onSubmit}>
        <div className="alertStyle">
          {alert !== "" && <Alert alert={alert} />}
        </div>
        <div className="inline">
          <input
            type="text"
            placeholder="Search News"
            autoComplete="off"
            onChange={onChange}
            value={query}
          />
        </div>
        <div className="inline">
          <Select value={dropdown} options={labels} onChange={handleChange} />
        </div>
        <div className="inline">
          <Select value={sort} options={dates} onChange={handleSort} />
        </div>
        <div className="inline">
          <input type="submit" value="Search" />
        </div>
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

export default App;
