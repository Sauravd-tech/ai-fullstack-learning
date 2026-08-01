import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MessageSquare, FileText, Search, ShoppingCart, Users, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();

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
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-borderMain bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex flex-row md:flex-col transition-all flex-shrink-0 z-50 shadow-sm md:shadow-none">
        <div className="p-4 md:p-6 flex items-center justify-between md:block">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Dev Platform
          </h1>
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-textMuted hover:text-blue-500 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 text-textMuted hover:text-blue-500 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 px-4 md:space-y-2 overflow-x-auto md:overflow-x-visible overflow-y-hidden md:overflow-y-auto flex md:flex-col items-center md:items-stretch gap-2 md:gap-0 pb-2 md:pb-0 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-textMuted hover:text-textMain'
                }`
              }
            >
              {item.icon}
              <span className="font-medium text-sm md:text-base">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex p-4 border-t border-borderMain flex-col gap-2">
          <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-textMuted hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-textMain transition-all">
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
