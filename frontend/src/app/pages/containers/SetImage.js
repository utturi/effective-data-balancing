import { useState } from 'react';
import axios from 'axios';
import { RiRefreshLine } from 'react-icons/ri';
import UploadImage from './UploadImage';
import SelectedText from './SelectedText';
import SelectedJson from './SelectedJson';

const SetImage = () => {
  var apiURL = 'http://localhost:5000';
  // var apiURL = process.env.PLATE_DETECTION_URL;

  const [imageFileName, setImageFileName] = useState(null); // 이미지 파일 그 자체
  const [success, setSuccess] = useState(false);
  const [selected, setSelected] = useState('text');

  const reset = () => {
    window.location.reload();
  };

  const sample = () => {
    setSuccess(true);
    setImageFileName('');
  };

  const onClick = event => {
    setSelected(event.target.id);
  };

  function SelectedItem() {
    if (selected == 'text') {
      return <div className="box-result">{success && <SelectedText />}</div>;
    } else if (selected == 'json') {
      return <div className="box-result">{success && <SelectedJson />}</div>;
    }
  }

  const handleChangeFile = event => {
    if (event.target.files != null) {
      const formddata = new FormData();

      formddata.append('file', event.target.files[0]);
      axios
        .post(`${apiURL}/fileUpload`, formddata)
        .then(res => {
          // alert('성공');
          console.log(res.data);
          setImageFileName(event.target.files[0].name);
          setSuccess(true);
        })
        .catch(err => {
          // alert('실패');
          console.log(err.response.data);
        });
    }
  };

  return (
    <div className="demo-visual">
      <div className="box_com image">
        <p>
          2MB 이하의 이미지를 올리거나
          <br />
          샘플을 선택해 결과를 확인해 보세요.
        </p>
        <button className="btn-q" onClick={sample}>
          샘플테스트
        </button>
        <label htmlFor="img_file" className="btn-q">
          파일 첨부
        </label>
        <input
          type="file"
          id="img_file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChangeFile}
        />
        {success && <UploadImage fileName={imageFileName} />}
      </div>
      <div className="box_com code">
        <div className="code-select">
          <button
            id="text"
            className={selected == 'text' ? 'selected-btn' : 'unselected-btn'}
            onClick={onClick}
          >
            TEXT
          </button>
          <button
            id="json"
            className={selected == 'json' ? 'selected-btn' : 'unselected-btn'}
            style={{ marginLeft: '20px' }}
            onClick={onClick}
          >
            JSON
          </button>
          <button className="reset-btn" onClick={reset}>
            <RiRefreshLine size="40" color="#FFF" />
          </button>
        </div>
        <SelectedItem />
      </div>
    </div>
  );
};

export default SetImage;
