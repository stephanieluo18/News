import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(
      "http://newsapi.org/v2/everything?domains=wsj.com&apiKey=7a24ab3bcf634857bbdd7a59206a6778"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading... </div>;
    } else {
      return (
        <div className="App">
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                Author: {item.author} | Title: {item.title}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
