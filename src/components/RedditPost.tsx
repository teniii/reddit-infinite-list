import React from "react";

interface RedditPostProps {
  name: string;
  photo: string;
  subreddit: string;
  link: string;
}

const RedditPost: React.FC<RedditPostProps> = ({
  name,
  photo,
  subreddit,
  link,
}) => {
  return (
    <div style={{ display: "flex", flex: 1, padding: "2rem 0rem" }}>
      <img
        src={photo}
        alt={name + "_thumbnail"}
        style={{ width: 150, height: 150, borderRadius: "1rem" }}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          marginLeft: "1rem",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <a
          style={{ color: "white", textAlign: "left", marginBlock: "0" }}
          href={`http://www.reddit.com${link}`}
        >
          <h2 style={{ marginBlockEnd: "2rem", marginBlockStart: "0" }}>
            {name}
          </h2>
        </a>
        <p style={{ marginBlock: 0 }}>
          Extracted from <i>{subreddit}</i> subreddit
        </p>
      </div>
    </div>
  );
};

export default RedditPost;
