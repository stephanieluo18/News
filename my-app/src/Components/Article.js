import React, { useState } from "react";

const Article = ({ article }) => {
  const title = article.title;
  const author = article.author;
  const description = article.description;
  const url = article.url;
  const urlToImage = article.urlToImage;

  return (
    <div className="article">
      <h2>{title}</h2>
      <h4>{author}</h4>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        View Article
      </a>
      <img src={urlToImage} alt="Article Image" />
    </div>
  );
};

export default Article;