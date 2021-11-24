import axios from 'axios';
import { useState } from 'react';
import UploadImage from '../containers/UploadImage';

const SetImage = () => {
  const apiURL = 'http://localhost:5000';

  const [imageFileName, setImageFileName] = useState(null); // 이미지 파일 그 자체
  const [success, setSuccess] = useState(false);

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

    // setImageFromFile({
    //   file: event.target.files[0],
    //   url: ({ result }) => {
    //     setImageFile(event.target.files[0]);
    //     setImageUrl(result);
    //   },
    // });
  };

  const setImageFromFile = ({ file, url }) => {
    let reader = new FileReader();

    reader.onload = function () {
      url({ result: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
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
      {/* {console.log(imageFileName)} */}
      {/* {imageFile && (
        <div className="show-image">
          <img src={imageUrl} alt={imageFile.name} />
        </div>
      )} */}
      {/* {console.log(imageFile)} */}
      {/* {imageFile && <img className="show-image" src={imageUrl} alt={imageFile.name} />} */}
    </>
  );
};

export default SetImage;
