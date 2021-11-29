import * as BsIcons from 'react-icons/bs';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text',
  },
  {
    title: '자동차번호검출',
    path: '/imgCarLicense',
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
    title: '자세추정',
    path: '/imgPose',
    icon: <BsIcons.BsEnvelopeFill />,
    cName: 'nav-text',
  },
  {
    title: '물체분석',
    path: '/imgDetection',
    icon: <BsIcons.BsEnvelopeFill />,
    cName: 'nav-text',
  },
];

export default SidebarData;
