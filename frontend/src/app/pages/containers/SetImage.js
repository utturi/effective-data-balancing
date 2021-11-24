import axios from 'axios';
import { useState } from 'react';
import UploadImage from './UploadImage';

const SetImage = () => {
  const apiURL = 'http://localhost:5000';

  const [imageFileName, setImageFileName] = useState(null); // 이미지 파일 그 자체
  const [success, setSuccess] = useState(false);

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
    <>
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
      {/* {imageFile && (
        <div className="show-image">
          <img src={imageUrl} alt={imageFile.name} />
        </div>
      )} */}
      {/* {imageFile && <img className="show-image" src={imageUrl} alt={imageFile.name} />} */}
    </>
  );
};

export default SetImage;
