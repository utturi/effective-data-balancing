import SetImage from '../containers/SetImage';

const Pose = () => {
  return (
    <>
      <section className="content-feature">
        <div className="content-feature-inner">
          <ul className="content-feature-inner-list">
            <li>AI TECH DEMO</li>
            <li print="here">IMAGE</li>
            <li print="here" style={{ color: '#000' }}>
              자세 추정
            </li>
          </ul>
        </div>
      </section>
      <div className="content-detail">
        <h1>자세 추정</h1>
        <p>Pose Estimate는 ~</p>
        <SetImage />
      </div>
    </>
  );
};

export default Pose;
