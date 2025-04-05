// src/components/Card.js
import React, { useState, useEffect } from 'react';

// Card Component
export function Card({ className, children, celebrityId }) {
  const [images, setImages] = useState([]);
  const apiKey = 'YOUR_API_KEY'; // Replace with your TMDb API key

  useEffect(() => {
    if (celebrityId) {
      const fetchImages = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${celebrityId}/images?api_key=${apiKey}`
        );
        const data = await response.json();
        setImages(data.profiles);
      };

      fetchImages();
    }
  }, [celebrityId]);

  return (
    <div className={`bg-slate-800 rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="relative">
        {images.length > 0 && (
          <img
            src={`https://image.tmdb.org/t/p/w500${images[0].file_path}`}
            alt="Celebrity"
            className="w-full h-48 object-cover rounded-t-xl"
          />
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// CardContent Component
export function CardContent({ className, children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
