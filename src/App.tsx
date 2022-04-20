import React from 'react';
import './App.css';
import Cropper from './components/Cropper';
import Cropper2 from './components/Cropper2';
import ImageCropper from './components/ImageCropper';
import VideoCrop from './components/VideoCrop';

function App() {
  return (
    <div className="App">
      <Cropper2 imgUrl="./Lenna.png" />
      {/* <Cropper /> */}
      {/* <ImageCropper padding={128} imageUrl="./Lenna.png" /> */}
      {/* <VideoCrop /> */}
    </div>
  );
}

export default App;
