import React from 'react';
import './App.css';
import Cropper from './components/Cropper';
import ImageCropper from './components/ImageCropper';
import VideoCrop from './components/VideoCrop';

function App() {
  return (
    <div className="App">
      {/* <Cropper /> */}
      <ImageCropper padding={128} imageUrl="./Lenna.png" />
    </div>
  );
}

export default App;
