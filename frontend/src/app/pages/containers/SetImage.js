import { useState } from 'react';
import axios from 'axios';
import { RiRefreshLine } from 'react-icons/ri';
import UploadImage from './UploadImage';
import SelectedText from './SelectedText';

const SetImage = () => {
  // const apiURL = 'http://localhost:5000';
  var apiURL = process.env.PLATE_DETECTION_URL;

  const [imageFileName, setImageFileName] = useState(null); // 이미지 파일 그 자체
  const [success, setSuccess] = useState(false);

  const reset = () => {
    window.location.reload();
  };

  const sample = () => {
    setSuccess(true);
    setImageFileName('');
  };

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
          <button className="text-selected-btn-o">TEXT</button>
          <button className="text-selected-btn">JSON</button>
          <button className="reset-btn" onClick={reset}>
            <RiRefreshLine size="40" color="#FFF" />
          </button>
        </div>
        <div className="box-result">{success && <SelectedText fileName={imageFileName} />}</div>
      </div>
    </div>
  );
};

export default SetImage;
