import { GrObjectGroup } from 'react-icons/gr';
import { MdEmojiPeople } from 'react-icons/md';

const BoxData2 = [
  {
    topic: 'IMAGE',
    title: '자세추정',
    icon: <MdEmojiPeople size="180" />,
    path: '/imgPose',
    cName: 'box-component',
  },
  {
    topic: 'IMAGE',
    title: '물체분석',
    icon: <GrObjectGroup size="150" />,
    path: '/imgDetection',
    cName: 'box-component',
  },
];

export default BoxData2;
