// In production, use relative URLs (same domain)
// In development, use localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  },

  // Auth
  login(username: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  verifyToken() {
    return this.request('/auth/verify');
  },

  // Bookings
  getBookings() {
    return this.request('/bookings');
  },

  getBooking(id: number) {
    return this.request(`/bookings/${id}`);
  },

  createBooking(data: any) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateBooking(id: number, data: any) {
    return this.request(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteBooking(id: number) {
    return this.request(`/bookings/${id}`, {
      method: 'DELETE',
    });
  },

  // Payments
  getPayments() {
    return this.request('/payments');
  },

  getPaymentsByBooking(bookingId: number) {
    return this.request(`/payments/booking/${bookingId}`);
  },

  createPayment(data: any) {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updatePayment(id: number, data: any) {
    return this.request(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deletePayment(id: number) {
    return this.request(`/payments/${id}`, {
      method: 'DELETE',
    });
  },

  // Transactions
  getTransactions() {
    return this.request('/transactions');
  },

  getTransactionSummary() {
    return this.request('/transactions/summary');
  },

  createTransaction(data: any) {
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateTransaction(id: number, data: any) {
    return this.request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteTransaction(id: number) {
    return this.request(`/transactions/${id}`, {
      method: 'DELETE',
    });
  },

  // Gallery
  getGalleryImages() {
    return this.request('/gallery');
  },

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    
    const token = localStorage.getItem('token');
    
    return fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw new Error(err.error || 'Upload failed'); });
      }
      return res.json();
    });
  },

  deleteImage(id: number) {
    return this.request(`/gallery/${id}`, {
      method: 'DELETE',
    });
  },
};

