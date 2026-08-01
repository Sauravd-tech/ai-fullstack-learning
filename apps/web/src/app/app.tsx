import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import { ChatPage } from '../features/chat';
import { ResumePage } from '../features/resume';
import ComingSoonPage from './pages/ComingSoonPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
