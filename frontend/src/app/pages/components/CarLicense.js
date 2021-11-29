import SetImage from '../containers/SetImage';

const CarLicense = () => {
  return (
    <>
      <section className="content-feature">
        <div className="content-feature-inner">
          <ul className="content-feature-inner-list">
            <li>AI TECH DEMO</li>
            <li print="here">IMAGE</li>
            <li print="here" style={{ color: '#000' }}>
              자동차 번호 검출
            </li>
          </ul>
        </div>
      </section>
      <div className="content-detail">
        <h1>자동차 번호 검출</h1>
        <p>Car Lisense Detection은 ~~</p>
        <SetImage />
      </div>
    </>
  );
};

export default CarLicense;
