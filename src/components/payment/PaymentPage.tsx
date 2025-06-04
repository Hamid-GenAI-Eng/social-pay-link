
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentModal } from './PaymentModal';
import { PaymentHistory } from './PaymentHistory';
import { Plus } from 'lucide-react';

interface PaymentPageProps {
  user: { name: string; email: string } | null;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handlePaymentSuccess = () => {
    setRefreshHistory(prev => prev + 1);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-slate-400">Manage your transactions and send money</p>
        </div>
        
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Make Payment
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 border-0">
        <CardHeader>
          <CardTitle className="text-white">Account Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">$2,450.00</div>
          <p className="text-blue-100 mt-2">Available for transfers</p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="text-green-400 text-2xl font-bold">$125.50</div>
            <p className="text-slate-400 text-sm">Received Today</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="text-red-400 text-2xl font-bold">$89.75</div>
            <p className="text-slate-400 text-sm">Sent Today</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="text-blue-400 text-2xl font-bold">12</div>
            <p className="text-slate-400 text-sm">Total Transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <PaymentHistory key={refreshHistory} />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        user={user}
      />
    </div>
  );
};
