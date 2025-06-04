
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
    <div className="fixed left-0 top-0 h-full w-16 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header with App Name */}
      <div className="p-2 border-b border-slate-700 flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-1">
          <span className="text-white font-bold text-sm">CP</span>
        </div>
        <div className="text-[10px] text-slate-300 font-medium text-center leading-tight">
          <div>Chat</div>
          <div>Pay</div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-2 border-b border-slate-700 flex justify-center">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-600 text-white text-xs">
            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-2">
        <Button
          variant={currentPage === 'chat' ? 'default' : 'ghost'}
          size="icon"
          className={`w-full ${
            currentPage === 'chat' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          onClick={() => onPageChange('chat')}
          title="Messages"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        
        <Button
          variant={currentPage === 'payment' ? 'default' : 'ghost'}
          size="icon"
          className={`w-full ${
            currentPage === 'payment' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          onClick={() => onPageChange('payment')}
          title="Payments"
        >
          <CreditCard className="h-4 w-4" />
        </Button>
      </nav>

      {/* Footer Actions */}
      <div className="p-2 border-t border-slate-700 space-y-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full text-slate-300 hover:bg-slate-700 hover:text-white"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-full text-red-400 hover:bg-red-900/20 hover:text-red-300"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
