import { useState } from 'react';

const SetImage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const setImageFromFile = ({ file, url }) => {
    let reader = new FileReader();

    reader.onload = function () {
      url({ result: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label for="img_file" className="btn-q">파일 첨부</label>
      <input
        type="file"
        id="img_file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={({ target: { files } }) => {
          if (files.length) {
            setImageFromFile({
              file: files[0],
              url: ({ result }) => {
                setImageFile(files[0]);
                setImageUrl(result);
              },
            });
          }
        }}
      />
      {imageFile && (
        <div className="show-image">
          <img src={imageUrl} alt={imageFile.name} />
        </div>
      )}
    </>
  );
};

export default SetImage;
