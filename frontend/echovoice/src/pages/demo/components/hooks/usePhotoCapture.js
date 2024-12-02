import { useState } from 'react';

export const usePhotoCapture = () => {
  const [photoURL, setPhotoURL] = useState(null);

  const takePhoto = (videoRef) => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photo = canvas.toDataURL('image/png');
      setPhotoURL(photo);
    }
  };

  return { photoURL, takePhoto };
};
