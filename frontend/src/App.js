import { Routes, Route } from 'react-router-dom'; /* version 6 변경사항 유의 */
import Navigation from './app/navigation/index';
import Home from './app/home/index';
import ImgCarLicense from './app/pages/index';
import ImgClassification from './app/pages/index';
import ImgPose from './app/pages/index';
import ImgDetetion from './app/pages/index';
import './styles/sass/main.css';

function App() {
  return (
    <div className="main-layout">
      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/imgCarLicense" element={<ImgCarLicense info="carlicense" />} />
          <Route path="/imgClassification" element={<ImgClassification info="classification" />} />
          <Route path="/imgPose" element={<ImgPose info="pose" />} />
          <Route path="/imgDetection" element={<ImgDetetion info="detection" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
