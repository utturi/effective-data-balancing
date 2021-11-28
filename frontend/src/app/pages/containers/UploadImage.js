import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';

export var FileTextData = null;

function UploadImage({ fileName }) {
  var apiURL = 'http://localhost:5000';
  // var apiURL = process.env.PLATE_DETECTION_URL;

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${apiURL}/?file_name=${fileName}`);

        setUsers(response.data);
        FileTextData = response.data;
        console.log(FileTextData);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
      <div className="show-image">
        <img src={users.img_url} />
      </div>
    </>
  );
}

export default UploadImage;
