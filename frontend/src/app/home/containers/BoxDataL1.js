import { AiFillCar } from 'react-icons/ai';
import { MdImageSearch } from 'react-icons/md';

const BoxData1 = [
  {
    topic: 'IMAGE',
    title: '자동차번호검출',
    icon: <AiFillCar size="180" />,
    path: '/imgCarLisense',
    cName: 'box-component',
  },
  {
    topic: 'Expain',
    title: '설명박스',
    icon: '',
    path: '/',
    cName: 'box-component explain',
  },
  {
    topic: 'IMAGE',
    title: '이미지분류',
    icon: <MdImageSearch size="180" />,
    path: '/imgClassification',
    cName: 'box-component',
  },
];

export default BoxData1;
