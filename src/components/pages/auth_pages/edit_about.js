import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

function EditAbout() {
  const [newTextBox1Title, setNewTextBox1Title] = useState("");
  const [newTextBox1Content, setNewTextBox1] = useState("");
  const [newTextBox2Title, setNewTextBox2Title] = useState("");
  const [newTextBox2Content, setNewTextBox2] = useState("");
  const [newTextBox3Title, setNewTextBox3Title] = useState("");
  const [newTextBox3Content, setNewTextBox3] = useState("");
  const [newPictureBox1, setNewPictureBox1] = useState("");
  const [newPictureBox2, setNewPictureBox2] = useState("");
  const [newPictureBox3, setNewPictureBox3] = useState("");
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
            { name:"textBox1" , title: newTextBox1Title, content:newTextBox1Content, link:""},
            { name:"textBox2" , title: newTextBox2Title, content:newTextBox2Content, link:""},
            { name:"textBox3" , title: newTextBox3Title, content:newTextBox3Content, link:""},
            { name:"pictureBox1" , title:"", content:"", link: newPictureBox1},
            { name:"pictureBox2" , title:"", content:"", link: newPictureBox2},
            { name:"pictureBox3" , title:"", content:"", link: newPictureBox3}
          ],
        }),
      });

      if (response.ok) {
        // Reset Inputs
        setNewTextBox1Title("");
        setNewTextBox1("");
        setNewTextBox2Title("");
        setNewTextBox2("");
        setNewTextBox3Title("");
        setNewTextBox3("");
        setNewPictureBox1("");
        setNewPictureBox2("");
        setNewPictureBox3("");
        history.push("/about")
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
           placeholder="Text Box 1 Title" 
            onChange={(e) => setNewTextBox1Title(e.target.value)}
            name="textBoxTitle"
           />
          Text Box 1 Title
        </label>
        <label>
        <input type="textbox"
           placeholder="Text Box 1 Content" 
            onChange={(e) => setNewTextBox1(e.target.value)}
            name="textBoxContent"
           />
          Text Box 1 Content
        </label>
      </form>
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="Text Box2 Title" 
            onChange={(e) => setNewTextBox2Title(e.target.value)}
            name="textBoxTitle"
           />
          Text Box 2 Title
        </label>
        <label>
        <input type="textbox"
           placeholder="Text Box 2 Content" 
            onChange={(e) => setNewTextBox2(e.target.value)}
            name="textBoxContent"
           />
          Text Box 2 Content
        </label>
      </form>
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="Text Box 3 Title" 
            onChange={(e) => setNewTextBox3Title(e.target.value)}
            name="textBoxTitle"
           />
          Text Box 3 Title
        </label>
        <label>
        <input type="textbox"
           placeholder="Text Box 3 Content" 
            onChange={(e) => setNewTextBox3(e.target.value)}
            name="textBoxContent"
           />
          Text Box 3 Content
        </label>
      </form>
      <form onSubmit={saveChanges}>
        <label>
          <input type="text"
           placeholder="Picture Box 1 Link" 
            onChange={(e) => setNewPictureBox1(e.target.value)}
            name="pictureBox"
           />
          Picture Box 1 Link
        </label>
        <label>
          <input type="text"
           placeholder="Picture Box 2 Link" 
            onChange={(e) => setNewPictureBox2(e.target.value)}
            name="pictureBox"
           />
          Picture Box 2 Link
        </label>
        <label>
          <input type="text"
           placeholder="Picture Box 3 Link" 
            onChange={(e) => setNewPictureBox3(e.target.value)}
            name="pictureBox"
           />
          Picture Box 3 Link
        </label>
      </form>
      <button onClick={saveChanges}>Save</button>
    </div>
  )
}

export default EditAbout 