
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, UserPlus } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  email: string;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
}

interface FriendsSidebarProps {
  selectedFriend: Friend | null;
  onSelectFriend: (friend: Friend) => void;
}

export const FriendsSidebar: React.FC<FriendsSidebarProps> = ({ selectedFriend, onSelectFriend }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock friends data
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      isOnline: true,
      lastMessage: 'Want to hop on a quick video call?',
      lastMessageTime: new Date(Date.now() - 10000),
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      isOnline: false,
      lastMessage: 'Thanks for the help!',
      lastMessageTime: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      name: 'Carol Wilson',
      email: 'carol@example.com',
      isOnline: true,
      lastMessage: 'See you tomorrow',
      lastMessageTime: new Date(Date.now() - 86400000),
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david@example.com',
      isOnline: false,
      lastMessage: 'Got it!',
      lastMessageTime: new Date(Date.now() - 172800000),
    },
  ]);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed left-16 top-16 h-[calc(100vh-4rem)] w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-300 hover:bg-slate-700 hover:text-white"
            title="Add Friend"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            className={`p-4 border-b border-slate-700 cursor-pointer transition-colors ${
              selectedFriend?.id === friend.id
                ? 'bg-slate-700'
                : 'hover:bg-slate-700/50'
            }`}
            onClick={() => onSelectFriend(friend)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {friend.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {friend.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium truncate">{friend.name}</h3>
                  {friend.lastMessageTime && (
                    <span className="text-xs text-slate-400">
                      {friend.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                {friend.lastMessage && (
                  <p className="text-sm text-slate-400 truncate mt-1">
                    {friend.lastMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
