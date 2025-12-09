import React, { useEffect, useState } from "react";
import { galleryItems } from "../data/content";
import { api } from "../utils/api";

interface GalleryImage {
  id: number;
  image_path: string;
  display_order: number;
}

const GalleryGrid: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await api.getGalleryImages();
      if (data && data.length > 0) {
        setImages(data);
      } else {
        setUseStatic(true);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
      setUseStatic(true);
    } finally {
      setLoading(false);
    }
  };

  // Use same relative URL behavior as the main API client:
  // - In production: relative '' (same domain, proxied to /api)
  // - In development: http://localhost:5000
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? '' : 'http://localhost:5000');
  const displayImages = useStatic ? galleryItems : images;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {displayImages.map((item: any, index: number) => {
        const styleNumber = String(index + 1).padStart(2, "0");
        const imageSrc = useStatic 
          ? item.image 
          : `${API_BASE_URL}${item.image_path}`;
        const itemId = useStatic ? item.id : item.id;

        return (
          <figure
            key={itemId}
            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/70 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[3/4] w-full">
              <img
                src={imageSrc}
                alt={`Braid style ${styleNumber}`}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Bottom strip with style number */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-10 flex items-end justify-between text-[11px]">
              <div className="flex items-center gap-1 text-pink-100">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15 backdrop-blur text-[10px]">
                  #{styleNumber}
                </span>
                <span className="hidden sm:inline">
                  Mention "Style {styleNumber}" when you book.
                </span>
              </div>
              <span className="inline-flex h-6 px-2 items-center justify-center rounded-full bg-white/15 backdrop-blur text-[10px] text-white">
                Save for inspo ✨
              </span>
            </div>
          </figure>
        );
      })}
    </div>
  );
};

export default GalleryGrid;
