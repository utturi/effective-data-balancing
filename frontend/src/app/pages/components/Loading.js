import RingLoader from 'react-spinners/RingLoader';

const Loading = () => {
  return (
    <div className="full-screen">
      <RingLoader size="300" color="rgba(21, 255, 177, 0.9)"  />
    </div>
  );
};

export default Loading;
