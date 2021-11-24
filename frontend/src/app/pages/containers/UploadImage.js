import { useState, useEffect } from 'react';
import axios from 'axios';

function UploadImage({ fileName }) {
  const apiURL = 'http://localhost:5000';

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${apiURL}/?file_name=${fileName}`);

        setUsers(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <ul>
      <img src={users.img_url} />
    </ul>
  );
}

export default UploadImage;
