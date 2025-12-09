import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import AdminNav from '../../components/AdminNav';

interface GalleryImage {
  id: number;
  image_path: string;
  display_order: number;
  created_at: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await api.getGalleryImages();
      setImages(data);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await api.uploadImage(file);
      loadImages();
      alert('Image uploaded successfully!');
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await api.deleteImage(id);
      loadImages();
    } catch (error: any) {
      alert(error.message || 'Error deleting image');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const API_BASE_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.PROD ? '' : 'http://localhost:5000');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <label className="bg-pink-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-pink-400 cursor-pointer">
            {uploading ? 'Uploading...' : '+ Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group bg-slate-900/70 border border-white/10 rounded-2xl overflow-hidden"
            >
              <img
                src={`${API_BASE_URL}${image.image_path}`}
                alt={`Gallery ${image.id}`}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No images in gallery. Upload your first image!
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

