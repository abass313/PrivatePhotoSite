import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBox from './LoginBox';

function Welcome() {
  const navigate = useNavigate();
  // ابدأ الحالة بـ false دائماً عند فتح الصفحة لضمان عدم التجاوز
  const [isVerified, setIsVerified] = useState(false);

  const handleNext = () => {
    if (isVerified) {
      navigate('/PrivatePhotos');
    }
  };

  return (
    <div className="welcome-page">
      {/* نمرر دالة يتم استدعاؤها فقط عند التحقق الناجح */}
      <LoginBox onLoginSuccess={() => setIsVerified(true)} />
      <div className="btn-container">
        <button 
          className="btn-aligm" 
          onClick={handleNext} 
          disabled={!isVerified} // يظل معطلاً طالما الشفرة لم تتحقق
        >
          Next ▷
        </button>
      </div>
    </div>
  );
}

export default Welcome;
