import React from "react";
import moment from "moment";

const Article = ({ article }) => {
  const title = article.title;
  const author = article.author;
  const date = article.publishedAt;
  const description = article.description;
  const url = article.url;
  const urlToImage = article.urlToImage;

  return (
    <div className="article">
      <div className="text">
        <h4>{title}</h4>
        <h5>{author != null && author.length > 25 ? "" : author}</h5>
        <h6>Published {moment(date).format("MMMM Do YYYY")}</h6>
        <p>{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <button type="button">View Article</button>
        </a>
      </div>
      <img src={urlToImage} alt="Article Image cannot be displayed" />
    </div>
  );
};

export default Article;
