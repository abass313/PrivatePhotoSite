import { useState, useEffect } from 'react';

function PhotoBox() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // تحميل الصور عند فتح المكون
  useEffect(() => {
    const savedPhotos = JSON.parse(localStorage.getItem('user_photos')) || [];
    setPhotos(savedPhotos);
  }, []);

  // إضافة صور جديدة
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevPhotos) => {
          const updatedPhotos = [...prevPhotos, reader.result];
          localStorage.setItem('user_photos', JSON.stringify(updatedPhotos));
          return updatedPhotos;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // حذف الصورة بعد التأكيد
  const handleDeletePhoto = (photoToDelete) => {
    const isConfirmed = window.confirm("هل أنت تأكد من فتح زر الحذف وإزالة هذه الصورة نهائياً؟");
    if (isConfirmed) {
      const updatedPhotos = photos.filter((photo) => photo !== photoToDelete);
      setPhotos(updatedPhotos);
      localStorage.setItem('user_photos', JSON.stringify(updatedPhotos));
      setSelectedPhoto(null); // إغلاق النافذة المكبرة
    }
  };

  return (
    <div className="photo-box-container">
      {/* رابط اختيار الصور */}
      <div className="upload-link-wrapper">
        <label htmlFor="file-upload" className="choose-photo-link">
          Choose your photo
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* معرض الصور بتنسيق Flexbox */}
      <div className="flex-gallery">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="photo-card"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo} alt={`Uploaded ${index}`} />
          </div>
        ))}
      </div>

      {/* نافذة المعاينة المكبرة والتحكم بالحذف عند الضغط على الصورة */}
      {selectedPhoto && (
        <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto} alt="Enlarged preview" className="enlarged-img" />
            <div className="modal-actions">
              <button 
                className="delete-photo-btn"
                onClick={() => handleDeletePhoto(selectedPhoto)}
              >
                حذف الصورة
              </button>
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedPhoto(null)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoBox;