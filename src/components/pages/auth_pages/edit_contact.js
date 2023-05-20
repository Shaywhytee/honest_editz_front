import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

function EditContact() {
  const [newContactTitle, setNewContactTitle] = useState("");
  const [newContactContent, setNewContactContent] = useState("");
  const [newClientsTitle, setNewClientsTitle] = useState("");
  const [newAdSquare1Title, setNewAdSquare1Title] = useState("");
  const [newAdSquare2Title, setNewAdSquare2Title] = useState("");
  const [newAdSquare3Title, setNewAdSquare3Title] = useState("");
  const [newAdSquare4Title, setNewAdSquare4Title] = useState("");
  const [newDiscordLink, setNewDiscordLink] = useState("");
  const [newDiscordTitle, setNewDiscordTitle] = useState("");

  const history = useHistory();


  //Save changes
  const saveChanges = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://honesteditz-back.herokuapp.com/content/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          changes: [
            { name:"contactTitle" , title: newContactTitle, content:newContactContent},
            { name:"newClients" , title: newClientsTitle},
            { name:"adSquare1" , title: newAdSquare1Title},
            { name:"adSquare2" , title: newAdSquare2Title},
            { name:"adSquare3" , title: newAdSquare3Title},
            { name:"asSquare4" , title: newAdSquare4Title},
            { name:"discordButton", title: newDiscordTitle, link: newDiscordLink},
          ],
        }),
      });

      if (response.ok) {
        // Reset Inputs
        setNewContactTitle("");
        setNewContactContent("");
        setNewClientsTitle("");
        setNewAdSquare1Title("");
        setNewAdSquare2Title("");
        setNewAdSquare3Title("");
        setNewAdSquare4Title("");
        setNewDiscordLink("");
        setNewDiscordTitle("");
        history.push("/contact")
        window.location.reload()
      } else {
        console.error('Failed to update content:', response.status);
      }
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };




  return (
    <div className="page_container">
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="Contact Title" 
            onChange={(e) => setNewContactTitle(e.target.value)}
            name="contactTitle"
           />
          Contact Title
        </label>
        <label>
        <input type="textbox"
           placeholder="Contact Content" 
            onChange={(e) => setNewContactContent(e.target.value)}
            name="contactContent"
           />
          Contact Content
        </label>
      </form>
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="New Clients Text" 
            onChange={(e) => setNewClientsTitle(e.target.value)}
            name="clientsText"
           />
          New Clients Text
        </label>
      </form>
      <form onSubmit={saveChanges}>
        <label>
        <input type="textbox"
           placeholder="As Square 1" 
            onChange={(e) => setNewAdSquare1Title(e.target.value)}
            name="adSquareText"
           />
          Ad Square 1 Text
        </label>
        <label>
          <input type="text"
           placeholder="Ad Square 2" 
            onChange={(e) => setNewAdSquare2Title(e.target.value)}
            name="adSquareText"
           />
          Ad Square 2 Text
        </label>
        <label>
        <input type="textbox"
           placeholder="Ad Square 3" 
            onChange={(e) => setNewAdSquare3Title(e.target.value)}
            name="adSquareText"
           />
          Ad Square 3 Text
        </label>
        <label>
          <input type="text"
           placeholder="Ad Square 4" 
            onChange={(e) => setNewAdSquare4Title(e.target.value)}
            name="adSquareText"
           />
          Ad Square 4
        </label>
      </form>
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="Discord Link" 
            onChange={(e) => setNewDiscordLink(e.target.value)}
            name="discordLink"
           />
          Discord Link
        </label>
        <label>
          <input type="text"
           placeholder="Discord Title" 
            onChange={(e) => setNewDiscordTitle(e.target.value)}
            name="discordTitle"
           />
          Discord Button Title
        </label>
      </form>
      <button onClick={saveChanges}>Save</button>
    </div>
  )
}

export default EditContact 