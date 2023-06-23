import { useState, useEffect } from "react";
import './imagereel.scss';

const ImageReel = ({ images, setViewImages }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const baseUrl = import.meta.env.VITE_CHRONICLE_URL;

  useEffect(() => {
    setMaxIndex(images.length - 1);
  }, [])

  const handlePrev = () => {
    if (imageIndex === 0) {
      setImageIndex(maxIndex);
    } else {
      setImageIndex(imageIndex - 1);
    }
  }

  const handleNext = () => {
    if (imageIndex === maxIndex) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  }

  return (
    <div className="image-reel-container">
      <div className="close-btn-container">
        <input type="button" value="x" onClick={() => setViewImages(0)} />
      </div>
      <div className="image-reel">
        <div className="image-reel-buttons-container">
          <div className="image-reel-buttons">
            <div className="image-reel-prev-container">
              <input onClick={handlePrev} className="image-reel-prev" type="button" />
            </div>

            <div className="image-reel-next-container">
              <input onClick={handleNext} className="image-reel-next" type="button" />
            </div>
          </div>
        </div>
        <img src={baseUrl + images[imageIndex]} alt={`image-${imageIndex + 1}`} />
      </div>
    </div>
  )
}

export default ImageReel;