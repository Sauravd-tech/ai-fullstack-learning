import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MessageSquare, FileText, Search, ShoppingCart, Users, Settings } from 'lucide-react';

const DashboardLayout = () => {
  const navItems = [
    { name: 'AI Chat', path: '/', icon: <MessageSquare size={20} /> },
    { name: 'Resume Analyzer', path: '/resume', icon: <FileText size={20} /> },
    { name: 'RAG Document', path: '/rag', icon: <Search size={20} /> },
    { name: 'AI Shopping', path: '/shopping', icon: <ShoppingCart size={20} /> },
    { name: 'Multi-Agent', path: '/multi-agent', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-bgMain text-textMain overflow-hidden">
      {/* Sidebar / Topnav */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-borderMain bg-bgSecondary flex flex-row md:flex-col transition-all flex-shrink-0">
        <div className="p-4 md:p-6 flex items-center justify-between md:block">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Dev Platform
          </h1>
          <button className="md:hidden flex items-center p-2 text-textMain/80 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 md:space-y-2 overflow-x-auto md:overflow-x-visible overflow-y-hidden md:overflow-y-auto flex md:flex-col items-center md:items-stretch gap-2 md:gap-0 pb-2 md:pb-0 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-600/20 text-textMain/80 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span className="font-medium text-sm md:text-base">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block p-4 border-t border-borderMain">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-textMain/80 hover:bg-blue-600/20 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* We use Outlet to render the nested routes (Chat, Resume, etc) */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
