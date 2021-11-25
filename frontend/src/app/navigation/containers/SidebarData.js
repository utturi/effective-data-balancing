import * as BsIcons from 'react-icons/bs';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text',
  },
  {
    title: '물체검출',
    path: '/imgDetection',
    icon: <BsIcons.BsPersonBoundingBox />,
    cName: 'nav-text',
  },
  {
    title: '이미지분류',
    path: '/imgClassification',
    icon: <BsIcons.BsFillInfoCircleFill />,
    cName: 'nav-text',
  },
  {
    title: '',
    path: '/',
    icon: <BsIcons.BsEnvelopeFill />,
    cName: 'nav-text',
  },
];

export default SidebarData;
