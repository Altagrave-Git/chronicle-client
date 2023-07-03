import './forms.scss';
import { useState, useEffect } from 'react';
import { MailAPI } from '../api/api';


const MessageForm = ({token, setNewMail, admin}) => {
  const [sender, setSender] = useState('');
  const [contact, setContact] = useState('');
  const [content, setContent] = useState('');
  const [messageType, setMessageType] = useState("email");
  const [success, setSuccess] = useState(0);

  useEffect(() => {
    const modal = document.querySelector(".message-success-overlay");
    if (success === 1) {
      modal.classList.remove("hide");
    } else if (!modal.classList.contains("hide")) {
      modal.classList.add("hide");
    }
  }, [success])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_CHRONICLE_URL + '/messages/send/';

    const form = {
      sender: sender,
      contact: contact,
      content: content,
    }

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        if (response.status === 200) {
          setSender('');
          setContact('');
          setContent('');
          setSuccess(1);
        }
        return response.json();
      })
      .then(data => {
        if (admin) {
          MailAPI.check(token)
            .then(data => setNewMail(data))
            .catch(error => console.log(error));
        }
        return data;
      })
      .catch(error => {
        console.log(error);
      }
    );
    return response;
  }

  return (
    <div className="message-form-container">
      <div className="message-success-overlay hide">
        <div className="message-success-modal">
          <h3>Your message has been sent</h3>
          <input type="button" value="Close" onClick={() => setSuccess(0)} />
        </div>
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <h2>Contact Form</h2>

        <div className="contact-form-info">
          <input className="form-text" type="text" name="name" id="name" autoComplete={"name"} value={sender} onChange={e => setSender(e.target.value)} placeholder="Enter your name" />

          { messageType === "email" ?
          <input className="form-text" type="email" name="contact" id="email" autoComplete={"email"} value={contact} onChange={e => setContact(e.target.value)} placeholder="Enter your e-mail" />
          :
          <input className="form-text" type="tel" name="contact" id="phone" autoComplete={"tel"} value={contact} onChange={e => setContact(e.target.value)} placeholder="Enter phone number" />
          }
        </div>

        <div className="radio-container">
          <span className="radio-title">Preferred:</span>
          <div className="radio">
            <label htmlFor="email-btn">E-mail</label>
            <input className="radio-btn" type="radio" name="message-type" id="email-btn" value="email" onClick={e => {
              setContact('');
              setMessageType(e.target.value);
            }} defaultChecked />
          </div>
          <div className="radio">
            <label htmlFor="phone-btn">Phone</label>
            <input className="radio-btn" type="radio" name="message-type" id="phone-btn" value="phone" onClick={e => {setMessageType(e.target.value)
              setContact('');
              setMessageType(e.target.value);
            }} />
          </div>
        </div>

        <textarea className='form-text' name="content" id="" cols="30" rows="10" value={content} onChange={e => setContent(e.target.value)} maxLength={2000} placeholder="Enter your message here..."></textarea>

        { sender.length > 0 && contact.length > 0 && content.length > 0 ?
        <input className="form-submit" type="submit" value="Send" />
        :
        <input className="form-submit" type="submit" value="Send" disabled />
        }
      </form>
    </div>
  )
}

export default MessageForm;