
import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { ChatPage } from '../components/chat/ChatPage';
import { PaymentPage } from '../components/payment/PaymentPage';
import { Sidebar } from '../components/layout/Sidebar';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<'chat' | 'payment'>('chat');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('chat');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 ml-64">
        {currentPage === 'chat' ? (
          <ChatPage user={user} />
        ) : (
          <PaymentPage user={user} />
        )}
      </main>
    </div>
  );
};

export default Index;
