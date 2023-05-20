import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

function EditPortfolio() {
  const [newVideoName, setNewVideoName] = useState("");
  const [newVideoDescription, setNewVideoDescription] = useState("");
  const [newVideoLength, setNewVideoLength] = useState("");
  const [newVideoSize, setNewVideoSize] = useState("");
  const [newVideoTags, setNewVideoTags] = useState("");
  const [newVideoLink, setNewVideoLink] = useState("");
  const history = useHistory();

  const extractVideoId = (videoLink) => {
    const startIndex = videoLink.indexOf("v=") + 2;
    const endIndex = videoLink.indexOf("&", startIndex);
    return endIndex === -1 ? videoLink.substring(startIndex) : videoLink.substring(startIndex, endIndex);
  }

  const extractVideoInfo = (videoLink) => {
    const videoId = extractVideoId(videoLink);

    const apiKey = 'AIzaSyDV2EJn-7CwSdeKJPuUp8Tc6hsB4RPPaVk';
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const videoInfo = data.items[0];
        const videoTitle = videoInfo.snippet.title;
        const videoLength = videoInfo.contentDetails.duration;
        console.log(videoInfo)
        setNewVideoName(videoTitle);
        setNewVideoLength(videoLength);
        setNewVideoLink(videoId)
      })
      .catch(error => {
        console.error('Failed to fetch video information', error)
      });
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    extractVideoInfo(newVideoLink)

    try {
      const response = await fetch('https://honesteditz-back.herokuapp.com/video/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_name: newVideoName,
          video_description: newVideoDescription,
          video_length: newVideoLength,
          video_size: newVideoSize,
          video_tags: newVideoTags,
          video_link: newVideoLink
        }),
      });

      if (response.ok) {
        setNewVideoName("");
        setNewVideoDescription("");
        setNewVideoLength("");
        setNewVideoSize("");
        setNewVideoTags("");
        setNewVideoLink("");
        history.push("/portfolio");
        window.location.reload()
      } else {
        console.error('Failed to update portfolio', response.status)
      }
    } catch(error) {
      console.error('Failed to add the video', error)
    };
  };

  return (
    <div className="page_container">
      <form onSubmit={saveChanges}>
        <label>
          <input
          type="text"
          placeholder="Video Link"
          onChange={(e) => setNewVideoLink(e.target.value)}
          name="videoLink"
          />
          Youtube Video Link
        </label>
        <label>
          <input
          type="text"
          placeholder="Video Description"
          onChange={(e) => setNewVideoDescription(e.target.value)}
          name="videoDescription"
          />
          Enter your video description. This will appear below the video title.
        </label>
        <label>
          <input
          type="text"
          placeholder="Video Tags"
          onChange={(e) => setNewVideoTags(e.target.value)}
          name="videoTags"
          />
          Enter your video tags seperated by a comma.
        </label>
      </form>
      <button onClick={saveChanges}>Submit</button>
    </div>
  )
}

export default EditPortfolio