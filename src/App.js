import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./normalize.css";
import "./skeleton.css";
import "./App.css";
import Alert from "./Components/Alert.js";
import Select from "react-select";
import Article from "./Components/Article.js";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState("");
  const [alert, setAlert] = useState("");
  const [dropdown, setDropdown] = useState({
    value: "general",
    label: "General",
  });
  const ids = [];

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

  const [sort, setSort] = useState({
    value: "publishedAt",
    label: "Most Recent",
  });

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
    const source = `https://newsapi.org/v2/sources?category=${dropdown.value}&apiKey=26d35504515e414c888efe04f5ba33e6`;
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
    const url = `https://newsapi.org/v2/everything?q=${query}&sources=${x}&sortBy=${sort.value}&pageSize=30&apiKey=26d35504515e414c888efe04f5ba33e6`;

    /* if user does not enter anything, alert message will show*/
    if (query === "") {
      return setAlert("Please type in a keyword");
    }
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
        <h1 onClick={getData}>Worldwide News</h1>
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
