
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUpCircle, ArrowDownCircle, Clock } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  recipient: string;
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

export const PaymentHistory: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'sent',
      recipient: 'Alice Johnson',
      amount: 125.50,
      description: 'Dinner split',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: '2',
      type: 'received',
      recipient: 'Bob Smith',
      amount: 75.00,
      description: 'Freelance work payment',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: '3',
      type: 'sent',
      recipient: 'Carol Davis',
      amount: 200.00,
      description: 'Rent contribution',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'pending',
    },
    {
      id: '4',
      type: 'received',
      recipient: 'David Wilson',
      amount: 50.25,
      description: 'Concert tickets',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: '5',
      type: 'sent',
      recipient: 'Emma Brown',
      amount: 89.75,
      description: 'Birthday gift',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'failed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-slate-600 text-white">
                    {transaction.recipient.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1">
                  {transaction.type === 'sent' ? (
                    <ArrowUpCircle className="h-4 w-4 text-red-400" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-green-400" />
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-white font-medium">{transaction.recipient}</p>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm">{transaction.description}</p>
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-semibold ${
                transaction.type === 'sent' ? 'text-red-400' : 'text-green-400'
              }`}>
                {transaction.type === 'sent' ? '-' : '+'}${transaction.amount.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
