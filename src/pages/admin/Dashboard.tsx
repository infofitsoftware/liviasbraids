import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../utils/api';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [bookings, summary] = await Promise.all([
        api.getBookings(),
        api.getTransactionSummary(),
      ]);

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b: any) => b.status === 'pending').length,
        totalIncome: summary.total_income || 0,
        totalExpense: summary.total_expense || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
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
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome back, {user?.username}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon="📅"
            color="pink"
          />
          <StatCard
            title="Pending Bookings"
            value={stats.pendingBookings}
            icon="⏳"
            color="yellow"
          />
          <StatCard
            title="Total Income"
            value={`$${stats.totalIncome.toFixed(2)}`}
            icon="💰"
            color="green"
          />
          <StatCard
            title="Net Profit"
            value={`$${(stats.totalIncome - stats.totalExpense).toFixed(2)}`}
            icon="📊"
            color="blue"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Bookings"
            description="Manage appointments and bookings"
            link="/admin/bookings"
            icon="📋"
          />
          <DashboardCard
            title="Payments"
            description="Record and track payments"
            link="/admin/payments"
            icon="💳"
          />
          <DashboardCard
            title="Transactions"
            description="View all financial transactions"
            link="/admin/transactions"
            icon="💵"
          />
          <DashboardCard
            title="Gallery"
            description="Manage gallery images"
            link="/admin/gallery"
            icon="🖼️"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({
  title,
  value,
  icon,
  color,
}) => {
  const colorClasses = {
    pink: 'bg-pink-500/20 border-pink-500/50',
    yellow: 'bg-yellow-500/20 border-yellow-500/50',
    green: 'bg-green-500/20 border-green-500/50',
    blue: 'bg-blue-500/20 border-blue-500/50',
  };

  return (
    <div className={`rounded-2xl border p-6 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{
  title: string;
  description: string;
  link: string;
  icon: string;
}> = ({ title, description, link, icon }) => {
  return (
    <Link
      to={link}
      className="block rounded-2xl bg-slate-900/70 border border-white/10 p-6 hover:border-pink-400/70 hover:-translate-y-1 transition"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </Link>
  );
};

export default Dashboard;

