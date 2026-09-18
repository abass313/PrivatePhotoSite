import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import PrivatePhotos from './PrivatePhotos';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/PrivatePhotos" element={<PrivatePhotos />} />
      </Routes>
    </HashRouter>
  );
}