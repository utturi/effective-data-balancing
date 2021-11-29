import { useState } from 'react';
import { Link } from 'react-router-dom';
import BoxData1 from '../containers/BoxDataL1';
import BoxData2 from '../containers/BoxDataL2';

const BoxList = () => {
  const [hide, setHide] = useState(true);

  const Explain = (
    <div
      className="explain-coponent"
      onMouseEnter={() => {
        setHide(false);
      }}
      onMouseLeave={() => {
        setHide(true);
      }}
    >
      <div className="box-content explain">
        <strong className="explain-title">ABOUT</strong>
        <span>kakao Nibs는?</span>
        {!hide && (
          <span>
            (내용 추가)
            <br />
            .<br />
            .<br />
            .<br />
            <br />
            팀장 - 허지현
            <br />
            팀원 - 김대건 임대호 조예림
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <ul className="list-box">
        {BoxData1.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              {item.cName == 'box-component explain' ? (
                Explain
              ) : (
                <Link to={item.path}>
                  <div className="box-content">
                    <span>{item.topic}</span>
                    <strong>{item.title}</strong>
                    <div className="icon">{item.icon}</div>
                  </div>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <ul className="list-box-sub">
        {BoxData2.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                <div className="box-content">
                  <span>{item.topic}</span>
                  <strong>{item.title}</strong>
                  <div className="icon">{item.icon}</div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BoxList;
