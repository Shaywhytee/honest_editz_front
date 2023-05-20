import React, { useState } from "react";
import axios from 'axios';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://honesteditz-back.herokuapp.com//send-email', { email, message });
      setResponseMessage(response.data.success ? 'Email sent successfully' : 'Error Sending Email');
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setResponseMessage('Failed to send email');
    }
  };

  const handleOkClick = () => {
    setShowForm(false);
    setShowConfirmation(false);
    window.location.reload();
  };

  return (
    <div className="form_container">
    {showForm && (
        <form onSubmit={handleSubmit}> 
          <input 
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Please enter what type of content you make and anything you would like to discuss in a consultation"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Send Email</button>
        </form>
      )}
      {showConfirmation && (
        <div className="confirmation_wrapper">
          {responseMessage && <p>{responseMessage}</p>}
          <button onClick={handleOkClick}>Ok!</button>
        </div>
      )}
  </div>
  );
}

export default ContactForm;

