"use client";
import { use, useEffect, useRef, useState } from "react";

export const ListOfNews = () => {
  // initialize state

  const [stories, setStories] = useState([]);
  //replace the isActive flag with a ref to avoid re-renders

  let isActiveRef = useRef(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchStories = async () => {
    setError(null);
    try {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );
      if (!res.ok) throw new Error(`failed to Load story Ids${res.status}`);
      const storyIds = await res.json();
      if (isActiveRef.current) setData(storyIds);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("fetch aborted");
      } else {
        setError(err.message);
        console.log("Error looading story Ids", error);
      }
    }
  };
  const fetchtitles = async () => {
    setError(null);

    try {
      data.map(async (d) => {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${d}.json`
        );
        if (!res.ok) throw new Error(`failed to Load story ${res.status}`);
        const storyData = await res.json();
        if (isActiveRef.current) {
          setStories((prevStoires) => [...prevStoires, storyData]);
        }
      });
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("fetch aborted");
      } else {
        setError(err.message);
        console.log("Error looading story titles", error);
      }
    }
  };

  useEffect(() => {
    console.log("fetching titles");
    console.log(data);
    fetchtitles();
  }, [data]);
  useEffect(() => {
    fetchStories();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div>
      <h2 className=" mt-4">List of stories</h2>
      {error && <p className=" text-red-500">Error: {error}</p>}
      <ul className=" grid justify-center gap-3">
        {stories.length === 0 && !error && <p>Loading...</p>}
        {stories.map((st) => (
          <li
            className=" w-full bg-white text-black  px-4 text-left text-sm mx-5 rounded "
            key={st.id}
          >
            {st.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
