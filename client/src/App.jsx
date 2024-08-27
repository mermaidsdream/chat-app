import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ChatWindowPage } from './pages/ChatWindowPage';
import { NoPage } from './pages/NoPage';
import { MainPage } from './pages/MainPage/MainPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/" exact element={<MainPage />} />
        <Route path="/chats/:id" element={<ChatWindowPage />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
