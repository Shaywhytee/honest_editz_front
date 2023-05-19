import React, { useEffect, useState } from "react";
import axios from "axios";

function Portfolio() {
  const [videos, setVideos] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/video/all").then((response) => {
      setVideos(response.data);
    }).catch((error) => {
      console.error("Error fetching videos:", error);
    });
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredVideos = activeFilter
    ? videos.filter((video) => video.video_tags.includes(activeFilter))
    : videos;

  return (
    <div className="portfolio_container">
      <div className="filters">
        <button onClick={() => handleFilterChange("")}>All</button>
        <button onClick={() => handleFilterChange("LOL")}>League of Legends</button>
        <button onClick={() => handleFilterChange("WOW")}>World of Warcraft</button>
      </div>
      <div className="video_grid">
        {filteredVideos.map((video) => (
          <div className="video_card" key={video.id}> 
            <iframe
              title={video.video_name}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.video_link}`}
              frameBorder={0}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <h3>{video.video_name}</h3>
            <p>{video.video_description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio