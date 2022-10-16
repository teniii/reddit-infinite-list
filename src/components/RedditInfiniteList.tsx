import React, { useCallback, useRef, useEffect } from "react";
import useFetchSubreddit from "../hooks/useFetchSubreddit.ts";
import RedditPost from "./RedditPost.tsx";

interface RedditInfiniteListProps {}

const RedditInfiniteList: React.FC<RedditInfiniteListProps> = () => {
  const { loading, error, list, fetchNextPage, after } = useFetchSubreddit(
    "http://www.reddit.com/r/aww/new.json?sort=new"
  );
  const triggerNextPage = useRef(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && loading !== true) {
        fetchNextPage(
          `http://www.reddit.com/r/aww/new.json?sort=new${
            after ? `&after=${after}` : ""
          }`
        );
      }
    },
    [fetchNextPage, after, loading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (triggerNextPage.current) observer.observe(triggerNextPage.current);
  }, [handleObserver]);

  return (
    <div className="App">
      <h1 style={{ marginBottom: "10rem" }}>
        Latest posts from{" "}
        <a className="App-link" href={"http://reddit.com/r/aww/new/"}>
          /r/aww/
        </a>
      </h1>
      <div>
        {list.map((item, i) => (
          <RedditPost
            key={i}
            name={item.title}
            photo={item.thumbnail}
            subreddit={item.subreddit}
            link={item.permalink}
          />
        ))}
      </div>
      {loading && <p>Fetching data...</p>}
      {error && <p>Woah! Something went wrong. Please try again later!</p>}
      <div ref={triggerNextPage} />
    </div>
  );
};

export default RedditInfiniteList;
