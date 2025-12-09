import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';

interface Booking {
  id: number;
  name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  style_description: string;
  status: string;
  price: number;
  total_paid: number;
  created_at: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    style_description: '',
    status: 'pending',
    price: '',
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await api.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setFormData({
      name: booking.name,
      phone: booking.phone,
      preferred_date: booking.preferred_date || '',
      preferred_time: booking.preferred_time || '',
      style_description: booking.style_description || '',
      status: booking.status,
      price: booking.price?.toString() || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedBooking) {
        await api.updateBooking(selectedBooking.id, formData);
      }
      setShowModal(false);
      loadBookings();
    } catch (error: any) {
      alert(error.message || 'Error updating booking');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      await api.deleteBooking(id);
      loadBookings();
    } catch (error: any) {
      alert(error.message || 'Error deleting booking');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      confirmed: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      completed: 'bg-green-500/20 text-green-300 border-green-500/50',
      cancelled: 'bg-red-500/20 text-red-300 border-red-500/50',
    };
    return colors[status] || colors.pending;
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
        <h1 className="text-3xl font-bold mb-8">Bookings Management</h1>

        <div className="bg-slate-900/70 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date/Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Style</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Paid</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-white/10 hover:bg-slate-800/30">
                    <td className="px-6 py-4">{booking.name}</td>
                    <td className="px-6 py-4">{booking.phone}</td>
                    <td className="px-6 py-4">
                      {booking.preferred_date && (
                        <div>
                          <div>{new Date(booking.preferred_date).toLocaleDateString()}</div>
                          {booking.preferred_time && (
                            <div className="text-sm text-slate-400">{booking.preferred_time}</div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 max-w-xs truncate">
                      {booking.style_description}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">${booking.price || '0.00'}</td>
                    <td className="px-6 py-4">${(booking.total_paid || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded text-sm hover:bg-blue-500/30"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-300 rounded text-sm hover:bg-red-500/30"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Edit Booking</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Time</label>
                    <input
                      type="time"
                      value={formData.preferred_time}
                      onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Style Description</label>
                  <textarea
                    value={formData.style_description}
                    onChange={(e) => setFormData({ ...formData, style_description: e.target.value })}
                    className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full rounded-lg bg-black border border-white/15 px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-pink-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-pink-400"
                  >
                    Save Changes
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

export default Bookings;

