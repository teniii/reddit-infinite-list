import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { RedditPost } from "../types";

const useFetchSubreddit = (query: string) => {
  const [metadata, setMetaData] = useState({
    loading: true,
    error: false,
    after: undefined,
  });
  const [list, setList] = useState<RedditPost[]>([]);

  const fetchNextPage = useCallback(async (url: string) => {
    try {
      setMetaData((prev) => ({ ...prev, loading: true, error: false }));
      const res = await axios.get(url);
      setList((prev) => [
        ...prev,
        ...res.data.data.children.map((item) => ({
          title: item.data.title,
          subreddit: item.data.subreddit,
          thumbnail: item.data.thumbnail,
          permalink: item.data.permalink,
        })),
      ]);
      setMetaData((prev) => ({
        ...prev,
        loading: false,
        after: res.data.data.after,
      }));
    } catch (err) {
      setMetaData((prev) => ({ ...prev, error: true }));
    }
  }, []);

  useEffect(() => {
    fetchNextPage(query);
  }, []);

  return { ...metadata, list, fetchNextPage };
};

export default useFetchSubreddit;
