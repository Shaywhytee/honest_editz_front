import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

function EditHome() {
  const [newSpotlightVideoTitle, setNewSpotlightVideoTitle] = useState("");
  const [newSpotlightVideo, setNewSpotlightVideo] = useState("");
  const [newHeroTitle, setNewHeroTitle] = useState("");
  const [newHeroContent, setNewHeroContent] = useState("");
  const [newHeroBackgroundImage, setNewHeroBackgroundImage] = useState("");
  const [newStepsTitle, setNewStepsTitle] = useState("");
  const [newStep1Title, setNewStep1Title] = useState("");
  const [newStep2Title, setNewStep2Title] = useState("");
  const [newStep3Title, setNewStep3Title] = useState("");
  const history = useHistory();


  //Save changes
  const saveChanges = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/content/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          changes: [
            { name:"heroText" , title: newHeroTitle, content:newHeroContent, link:""},
            { name:"spotlightVideo" , title: newSpotlightVideoTitle, content:"", link:newSpotlightVideo},
            { name:"steps" , title:newStepsTitle, content:"", link:""},
            { name:"step1" , title:newStep1Title, content:"", link:""},
            { name:"step2" , title:newStep2Title, content:"", link:""},
            { name:"step3" , title:newStep3Title, content:"", link:""}
          ],
        }),
      });

      if (response.ok) {
        // Reset Inputs
        setNewSpotlightVideoTitle("");
        setNewSpotlightVideo("");
        setNewHeroTitle("");
        setNewHeroContent("");
        setNewHeroBackgroundImage("");
        setNewStepsTitle("");
        setNewStep1Title("");
        setNewStep2Title("");
        setNewStep3Title("");
        history.push("/home")
        window.location.reload()
      } else {
        console.error('Failed to update content:', response.status);
      }
    } catch (error) {
      console.error('Couldnt updating content:', error);
    }
  };




  return (
    <div className="page_container">
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="Hero Box Title" 
            onChange={(e) => setNewHeroTitle(e.target.value)}
            name="heroTitle"
           />
          Hero Box Title
        </label>
        <label>
        <input type="textbox"
           placeholder="Hero Box Content" 
            onChange={(e) => setNewHeroContent(e.target.value)}
            name="heroContent"
           />
          Hero Box Content
        </label>
        <label>
          <input type="text"
           placeholder="Hero Box Background" 
            onChange={(e) => setNewHeroBackgroundImage(e.target.value)}
            name="heroBoxBackground"
           />
          Hero Box Background
        </label>
      </form>
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="Spotlight Video Title" 
            onChange={(e) => setNewSpotlightVideoTitle(e.target.value)}
            name="spotlightVideoTitle"
           />
          Spotlight Video Title
        </label>
        <label>
          <input type="text"
           placeholder="Spotlight Video Link" 
            onChange={(e) => setNewSpotlightVideo(e.target.value)}
            name="spotlightVideo"
           />
          Spotlight Video Link
        </label>
      </form>
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="Steps" 
            onChange={(e) => setNewStepsTitle(e.target.value)}
            name="stepsTitle"
           />
          Steps Title Box
        </label>
        <label>
        <input type="text"
           placeholder="Step 1" 
            onChange={(e) => setNewStep1Title(e.target.value)}
            name="step1Title"
           />
          Step 1 Box
        </label>
        <label>
        <input type="text"
           placeholder="Step 2" 
            onChange={(e) => setNewStep2Title(e.target.value)}
            name="step2Title"
           />
          Step 2 Box
        </label>
        <label>
        <input type="text"
           placeholder="Step 3" 
            onChange={(e) => setNewStep3Title(e.target.value)}
            name="step3Title"
           />
          Step 3 Box
        </label>
      </form>
      <button onClick={saveChanges}>Save</button>
    </div>
  )
}

export default EditHome