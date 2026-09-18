import { useState } from 'react';

function LoginBox({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmitVerification = (event) => {
    event.preventDefault();

    // التحقق الصارم من الإيميل وكلمة السر
    if (email === 'admin313@gmail.com' && password === 'admin313') {
      if (!username.trim()) {
        setError('يرجى إدخال اسم المستخدم');
        return;
      }
      
      // حفظ الاسم والبيانات
      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', 'true');
      setError('');
      
      // تفعيل زر Next في الصفحة الأب (Welcome)
      onLoginSuccess();
    } else {
      setError('الإيميل أو كلمة السر غير صحيحة!');
    }
  };

  return (
    <div className="login-box">
      <img src="/login.png" alt="Login" className="login-image" />
      <form onSubmit={handleSubmitVerification}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">Verify Login</button>
      </form>
    </div>
  );
}

export default LoginBox;