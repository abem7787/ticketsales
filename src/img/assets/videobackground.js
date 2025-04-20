import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoBackground = () => {
  const videos = [
    '/img/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4'
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const changeVideo = () => {
      setShowVideo(false);
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => 
          (prevIndex + 1) % videos.length
        );
        setShowVideo(true);
      }, 1000); // Transition duration
    };

    const interval = setInterval(changeVideo, 10000);

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="video-background" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      <video 
        ref={videoRef}
        key={videos[currentVideoIndex]}
        autoPlay 
        muted 
        loop 
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover',
          opacity: showVideo ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;