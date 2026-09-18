import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoBox from './PhotoBox';

function PrivatePhotos() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="private-photos-page">
      <div className="welcome-header-box">
        <h1>Hello {username}, Welcome to private photo site</h1>
      </div>
      <PhotoBox />
    </div>
  );
}

export default PrivatePhotos;