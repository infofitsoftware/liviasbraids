import React, { useEffect, useRef, useState } from "react";

type Props = {
  images: string[]; // array of image paths
  interval?: number; // ms
  showDots?: boolean;
  heightClass?: string; // e.g., "h-52"
};

const ImageCarousel: React.FC<Props> = ({
  images,
  interval = 3000,
  showDots = true,
}) => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // auto-scroll
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [images.length, interval]);

  useEffect(() => {
    // translate track
    const track = trackRef.current;
    if (!track) return;
    const width = track.children[0]
      ? (track.children[0] as HTMLElement).clientWidth + 8
      : 0; // gap approximation
    const offset = index * width;
    track.style.transform = `translateX(-${offset}px)`;
  }, [index]);

  // manual nav
  const goTo = (i: number) => {
    setIndex(i % images.length);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(
        () => setIndex((s) => (s + 1) % images.length),
        interval
      );
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="carousel-track"
        ref={trackRef}
        style={{ transition: "transform 0.6s ease" }}
      >
        {images.map((src, i) => (
          <div
  key={i}
  className="
    w-1/2            /* half width */
    aspect-square     /* perfect square */
    flex-shrink-0
    rounded-xl
    overflow-hidden
    border border-white/10
  "
>
  <img
    src={src}
    alt={`carousel-${i}`}
    className="w-full h-full object-cover"
  />
</div>

        ))}
      </div>

      {/* dots */}
      {showDots && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`carousel-dot ${i === index ? "active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
