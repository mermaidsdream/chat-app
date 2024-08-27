import avatar from '../../assets/images/avatar.png';

import './ChatMessage.css';

export const ChatMessage = ({ message, selectedChat }) => {
  return (
    <>
      <div className={`chat-message ${message.isOwn ? 'own' : ''}`}>
      <div className='chat-message-block-photo'>
      <img className='chat-message-photo' src={avatar} alt='user avatar' width={50} />
      </div>
      <div className='chat-message-block-text'>
        <h4 className='chat-message-title'>{message.isOwn ? 'me' : selectedChat.name}</h4>
        <p className='chat-message-text'>{message.text}</p>
        <span className='chat-message-time'>{message.time}</span>
      </div>
    </div>
    </>
  );
};
