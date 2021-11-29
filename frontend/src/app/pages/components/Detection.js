import SetImage from '../containers/SetImage';

const Detection = () => {
  return (
    <>
      <section className="content-feature">
        <div className="content-feature-inner">
          <ul className="content-feature-inner-list">
            <li>AI TECH DEMO</li>
            <li print="here">IMAGE</li>
            <li print="here" style={{ color: '#000' }}>
              물체 분석
            </li>
          </ul>
        </div>
      </section>
      <div className="content-detail">
        <h1>물체 분석</h1>
        <p>Object Detection은 ~</p>
        <SetImage />
      </div>
    </>
  );
};

export default Detection;
