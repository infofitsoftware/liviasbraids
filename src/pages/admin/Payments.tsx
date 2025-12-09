import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';

interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  payment_method: string;
  notes: string;
  customer_name: string;
  customer_phone: string;
  created_at: string;
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    booking_id: '',
    amount: '',
    payment_method: 'cash',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [paymentsData, bookingsData] = await Promise.all([
        api.getPayments(),
        api.getBookings(),
      ]);
      setPayments(paymentsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createPayment({
        ...formData,
        booking_id: parseInt(formData.booking_id),
        amount: parseFloat(formData.amount),
      });
      setShowModal(false);
      setFormData({ booking_id: '', amount: '', payment_method: 'cash', notes: '' });
      loadData();
    } catch (error: any) {
      alert(error.message || 'Error creating payment');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this payment?')) return;
    try {
      await api.deletePayment(id);
      loadData();
    } catch (error: any) {
      alert(error.message || 'Error deleting payment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Payments</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-pink-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-pink-400"
          >
            + Add Payment
          </button>
        </div>

        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="text-2xl font-bold text-green-400">
            Total Payments: ${totalAmount.toFixed(2)}
          </div>
        </div>

        <div className="bg-slate-900/70 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Booking ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Notes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-t border-white/10 hover:bg-slate-800/30">
                    <td className="px-6 py-4">
                      <div>{payment.customer_name || 'N/A'}</div>
                      <div className="text-sm text-slate-400">{payment.customer_phone || ''}</div>
                    </td>
                    <td className="px-6 py-4">#{payment.booking_id}</td>
                    <td className="px-6 py-4 font-semibold text-green-400">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 capitalize">{payment.payment_method}</td>
                    <td className="px-6 py-4 text-sm text-slate-300 max-w-xs truncate">
                      {payment.notes || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(payment.id)}
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
              <h2 className="text-2xl font-bold mb-6">Add Payment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Booking</label>
                  <select
                    value={formData.booking_id}
                    onChange={(e) => setFormData({ ...formData, booking_id: e.target.value })}
                    className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    required
                  >
                    <option value="">Select booking</option>
                    {bookings.map((booking) => (
                      <option key={booking.id} value={booking.id}>
                        #{booking.id} - {booking.name} - ${booking.price || '0.00'}
                      </option>
                    ))}
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
                  <label className="block text-sm text-slate-300 mb-1">Payment Method</label>
                  <select
                    value={formData.payment_method}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="venmo">Venmo</option>
                    <option value="zelle">Zelle</option>
                    <option value="paypal">PayPal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    rows={3}
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-pink-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-pink-400"
                  >
                    Add Payment
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

export default Payments;

