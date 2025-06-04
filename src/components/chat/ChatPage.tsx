
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Video, Send, Mic, MicOff } from 'lucide-react';

interface ChatPageProps {
  user: { name: string; email: string } | null;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export const ChatPage: React.FC<ChatPageProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Alice Johnson',
      content: 'Hey! How are you doing today?',
      timestamp: new Date(Date.now() - 30000),
      isCurrentUser: false,
    },
    {
      id: '2',
      sender: user?.name || 'You',
      content: 'Im doing great! Just working on some projects. How about you?',
      timestamp: new Date(Date.now() - 20000),
      isCurrentUser: true,
    },
    {
      id: '3',
      sender: 'Alice Johnson',
      content: 'Same here! Want to hop on a quick video call to discuss the new features?',
      timestamp: new Date(Date.now() - 10000),
      isCurrentUser: false,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: user?.name || 'You',
      content: newMessage,
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const startCall = (type: 'audio' | 'video') => {
    setIsCallActive(true);
    // Simulate call functionality
    console.log(`Starting ${type} call...`);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-green-600 text-white">AJ</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-white">Alice Johnson</h2>
              <p className="text-sm text-green-400">Online</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => startCall('audio')}
              disabled={isCallActive}
            >
              <Phone className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => startCall('video')}
              disabled={isCallActive}
            >
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Call UI */}
      {isCallActive && (
        <Card className="m-4 bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-center">Video Call Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 h-64 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="bg-green-600 text-white text-2xl">AJ</AvatarFallback>
                </Avatar>
                <p className="text-white">Alice Johnson</p>
                <p className="text-green-400 text-sm">Connected</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className={`border-slate-600 ${isMuted ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={endCall}
              >
                End Call
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.isCurrentUser
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-white'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isCurrentUser ? 'text-blue-200' : 'text-slate-400'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-slate-800 border-t border-slate-700 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            disabled={isCallActive}
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isCallActive}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
