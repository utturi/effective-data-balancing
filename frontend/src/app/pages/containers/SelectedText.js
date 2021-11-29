import { FileTextData } from './UploadImage';
import { useState, useEffect } from 'react';

const SelectedText = () => {
  return (
    <>
      {FileTextData &&
        FileTextData.text_arr.map((text, idx) => (
          <div key={idx} className="text-ground">
            <div className="text-design">{text}</div>
          </div>
        ))}
    </>
  );
};

export default SelectedText;
