import SetImage from '../containers/SetImage';

const Classification = () => {
  return (
    <>
      <section className="content-feature">
        <div className="content-feature-inner">
          <ul className="content-feature-inner-list">
            <li>AI TECH DEMO</li>
            <li print="here">IMAGE</li>
            <li print="here" style={{ color: '#000' }}>
              이미지 분류
            </li>
          </ul>
        </div>
      </section>
      <div className="content-detail">
        <h1>이미지 분류</h1>
        <p>Image Classification은 ~</p>
        <SetImage />
      </div>
    </>
  );
};

export default Classification;
