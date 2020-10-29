import React from "react";

const Article = ({ article }) => {
  const title = article.title;
  const author = article.author;
  const description = article.description;
  const url = article.url;
  const urlToImage = article.urlToImage;

  return (
    <div className="article">
      <div className="text">
        <h4>{title}</h4>
        <h5>{author != null && author.length > 50 ? "" : author}</h5>
        <p>{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <button type="button">View Article</button>
        </a>
      </div>
      <img src={urlToImage} alt="Article" />
    </div>
  );
};

export default Article;
