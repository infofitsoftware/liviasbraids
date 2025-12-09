import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  customer_name: string;
  created_at: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, net_profit: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [transactionsData, summaryData] = await Promise.all([
        api.getTransactions(),
        api.getTransactionSummary(),
      ]);
      setTransactions(transactionsData);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setShowModal(false);
      setFormData({ type: 'expense', amount: '', description: '' });
      loadData();
    } catch (error: any) {
      alert(error.message || 'Error creating transaction');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await api.deleteTransaction(id);
      loadData();
    } catch (error: any) {
      alert(error.message || 'Error deleting transaction');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-pink-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-pink-400"
          >
            + Add Expense
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-6">
            <div className="text-sm text-slate-400 mb-1">Total Income</div>
            <div className="text-3xl font-bold text-green-400">
              ${summary.total_income.toFixed(2)}
            </div>
          </div>
          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6">
            <div className="text-sm text-slate-400 mb-1">Total Expenses</div>
            <div className="text-3xl font-bold text-red-400">
              ${summary.total_expense.toFixed(2)}
            </div>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-2xl p-6">
            <div className="text-sm text-slate-400 mb-1">Net Profit</div>
            <div className="text-3xl font-bold text-blue-400">
              ${summary.net_profit.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-white/10 hover:bg-slate-800/30">
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border ${
                          transaction.type === 'income'
                            ? 'bg-green-500/20 text-green-300 border-green-500/50'
                            : 'bg-red-500/20 text-red-300 border-red-500/50'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {transaction.customer_name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded text-sm hover:bg-red-500/30"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">Add Expense</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                    className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-pink-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-pink-400"
                  >
                    Add Transaction
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;

