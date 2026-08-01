import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import { ChatPage } from '../features/chat';
import { ResumePage } from '../features/resume';
import ComingSoonPage from './pages/ComingSoonPage';

function App() {
  const [theme, setTheme] = useState('dark');

  // We can manage global theme here
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<ChatPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="rag" element={<ComingSoonPage title="RAG Document Chat" />} />
          <Route path="shopping" element={<ComingSoonPage title="AI Shopping Agent" />} />
          <Route path="multi-agent" element={<ComingSoonPage title="Multi-Agent System" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
