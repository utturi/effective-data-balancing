import CarLicense from './components/CarLicense';
import Classification from './components/Classification';
import Pose from './components/Pose';
import Detection from './components/Detection';

const index = ({ info }) => {
  switch (info) {
    case 'carlicense':
      return <CarLicense />;
    case 'classification':
      return <Classification />;
    case 'pose':
      return <Pose />;
    case 'detection':
      return <Detection />;
  }
};

export default index;
