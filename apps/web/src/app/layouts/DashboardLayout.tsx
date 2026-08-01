import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MessageSquare, FileText, Search, ShoppingCart, Users, Settings, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'AI Chat', path: '/', icon: <MessageSquare size={20} /> },
    { name: 'Resume Analyzer', path: '/resume', icon: <FileText size={20} /> },
    { name: 'RAG Document', path: '/rag', icon: <Search size={20} /> },
    { name: 'AI Shopping', path: '/shopping', icon: <ShoppingCart size={20} /> },
    { name: 'Multi-Agent', path: '/multi-agent', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-bgMain text-textMain overflow-hidden transition-colors duration-300">
      {/* Sidebar / Topnav */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-borderMain bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col transition-all flex-shrink-0 z-50 shadow-sm md:shadow-none">
        <div className="p-4 md:p-6 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-aramexRed dark:text-aramexRed">
            Aramex AI
          </h1>
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-textMuted hover:text-aramexRed transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-textMuted hover:text-aramexRed transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        <nav className={`flex-1 px-4 pb-4 md:pb-0 overflow-y-auto flex-col gap-2 ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-aramexRed text-white shadow-md shadow-aramexRed/20' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-textMuted hover:text-textMain'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className={`p-4 border-t border-borderMain flex-col gap-2 ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
          <button onClick={() => {
            toggleTheme();
            setIsMobileMenuOpen(false);
          }} className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-textMuted hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-textMain transition-all md:hidden">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          <button onClick={toggleTheme} className="hidden md:flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-textMuted hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-textMain transition-all">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-textMuted hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-textMain transition-all">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-bgMain">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
