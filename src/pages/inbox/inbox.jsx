import "./inbox.scss";
import { useEffect, useState } from "react";
import { MailAPI } from "../../api/api";

const InboxView = ({token, admin, setNewMail}) => {
  const [messages, setMessages] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);

  const baseUrl = import.meta.env.VITE_CHRONICLE_URL;

  useEffect(() => {
    if (admin) {
      MailAPI.get(token)
        .then(data => {
          setMessages(data);
          setActiveIndex(0);
        });
    } else {
      location.href = import.meta.env.VITE_BASE_URL;
    }
  }, [])

  useEffect(() => {
    if (admin && activeIndex != null && messages[activeIndex].is_new == true) {
      const message = messages[activeIndex];

      const newMessages = []
      for (let item of messages) {
        newMessages.push(item);
      }

      MailAPI.read(token, message.id)
      .then(data => {
        message.is_new = data.is_new;
        newMessages[activeIndex] = message;
        setMessages(newMessages);
        MailAPI.check(token)
          .then(data => setNewMail(data));
      });
    }
  }, [activeIndex])

  return (
    <main className="inbox">
      <section className="inbox-left">
        <ul className="mail-list">
          { messages && messages.length > 0 &&
            messages.map((message, index) => {
              return (
                <li onClick={() => setActiveIndex(index)} key={index} className={message.is_new ? "mail-list-entry new" : index == activeIndex ? "mail-list-entry active" : "mail-list-entry"}>
                  <span className="mail-list-sender">{message.sender}</span>
                  <span>{message.date}</span>
                </li>
              )
            })
          }
        </ul>
      </section>
      <div className="inbox-fixed-container">
        <section className="inbox-right">
          { messages && messages.length &&
          <>
            <div className="message-head">
              <div>
                <p>From: {messages[activeIndex].sender}</p>
                <p>{messages[activeIndex].time}</p>
              </div>
              <div>
                <p>Contact: {messages[activeIndex].contact}</p>
                <p>{messages[activeIndex].date}</p>
              </div>
            </div>
            <div className="message-body">
            { messages &&
            messages[activeIndex].content.split("\n").map((content, index) => {
              return (
                <p key={index}>{content}</p>
              )
            })}
            </div>
          </>
          }
        </section>
      </div>
    </main>
  )
}

export default InboxView;