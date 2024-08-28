import { useRef } from 'react';

import { ChatItem } from "../ChatItem/ChatItem";

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import avatar from '../../assets/images/avatar.png';
import './ChatList.css';

export const ChatList = ({ chats, onSelectChat, searchItem, searchHandler, onDeleteChat, onEditChat  }) => {
  const inputEl = useRef('');

  const getSearchItem = () => {
    searchHandler(inputEl.current.value);
  };

  return (
    <>
      <div className="chat-list">
      <div className='chat-list-header'>
        <IoCheckmarkCircleOutline className="check-mark" />
        <img src={avatar} alt='user avatar' width={50} className='avatar-img' />

        <button type='submit' className='send-button'>Log in</button>
        <div className='header-container'>
          <div className="search-icon"><CiSearch /></div>
          <input
          type="text"
          placeholder="Search or start new chat"
          className="search-bar"
          value={searchItem}
          onChange={getSearchItem}
          ref={inputEl}
          />
        </div>
      </div>
      <h2 className="chat-list-title"><span>Chats</span></h2>
      <ChatItem
        chats={chats}
        onSelectChat={onSelectChat}
        onDeleteChat={onDeleteChat}
        onEditChat={onEditChat}
      />
    </div>
    </>
  );
};
