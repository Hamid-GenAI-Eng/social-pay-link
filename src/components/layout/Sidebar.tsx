
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, CreditCard, LogOut, Settings } from 'lucide-react';

interface SidebarProps {
  currentPage: 'chat' | 'payment';
  onPageChange: (page: 'chat' | 'payment') => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, user, onLogout }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">ChatPay</h1>
        <p className="text-sm text-slate-400">Professional Communication</p>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-600 text-white">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={currentPage === 'chat' ? 'default' : 'ghost'}
          className={`w-full justify-start ${
            currentPage === 'chat' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          onClick={() => onPageChange('chat')}
        >
          <MessageCircle className="mr-3 h-4 w-4" />
          Messages
        </Button>
        
        <Button
          variant={currentPage === 'payment' ? 'default' : 'ghost'}
          className={`w-full justify-start ${
            currentPage === 'payment' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          onClick={() => onPageChange('payment')}
        >
          <CreditCard className="mr-3 h-4 w-4" />
          Payments
        </Button>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
