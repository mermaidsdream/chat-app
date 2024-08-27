import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";

import avatar from '../../assets/images/avatar.png';
import './ChatItem.css';

export const ChatItem = ({ chats, onSelectChat, onDeleteChat, onEditChat }) => {
  if (!chats.length) {
    return <h2 className="chat-item-info">No chat available</h2>
  }

  const newTime = () => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let today = new Date();
    let domEnder = function() { var a = today; if (/1/.test(parseInt((a + "").charAt(0)))); a = parseInt((a + "").charAt(1)); return 1 === a ? "st" : 2 === a ? "nd" : 3 === a ? "rd" : "th" }();
    let dayOfMonth = (today.getDate() < 10) ? '0' + today.getDate() + domEnder : today.getDate() + domEnder;
    let month = months[today.getMonth()];
    let year = today.getFullYear();
    let fullDate = `${dayOfMonth} ${month}, ${year}`;
    return fullDate;
  }

  return (
    <>
        <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => onSelectChat(chat)}>
            <div className="chat-item">
              <img src={avatar} alt={`${chat.name} avatar`} className='avatar-img' />
              <IoCheckmarkCircleOutline className="check-mark" />
              <div className="chat-item-about">
                <h5>{chat.name}</h5>
                <p>{chat.lastMessage}</p>
              </div>
              <span className="chat-item-time">{newTime(chat.time)}</span>
              <div className="button-container">
                <button className="edit-button" onClick={() => onEditChat(chat.id)}>Edit</button>
                <button className="delete-button" onClick={() => onDeleteChat(chat.id)}>
                  <RiDeleteBin2Fill />
                </button>
              </div>
            </div>
          </li>
        ))}
        </ul>
    </>
  )
}
