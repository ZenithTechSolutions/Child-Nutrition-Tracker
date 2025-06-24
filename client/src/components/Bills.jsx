import { useState, useEffect } from 'react';
import axios from 'axios'; // Use the custom axios instance
import '../styles/bills.css';

const Bills = () => {
  const [todayImageId, setTodayImageId] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkTodayImage();
  }, []);

  const checkTodayImage = async () => {
    try {
      const res = await axios.get('/api/bills/today');
      if (res.data.imageId) {
        setTodayImageId(res.data.imageId);
      }
    } catch (err) {
      console.error('Error checking today image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const confirmUpload = window.confirm(
      "⚠️ You can upload only once per day.\nOnce uploaded, it cannot be modified or deleted.\nDo you want to continue?"
    );
    if (!confirmUpload) return;

    const formData = new FormData(e.target);

    try {
      const response = await axios.post('/api/bills/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || 'Upload failed.');
      console.error(error);
    }
  };

  const viewTodayImage = () => {
    if (todayImageId) {
      window.open(`${import.meta.env.VITE_BACKEND_URL}/api/bills/${todayImageId}`, '_blank');
    }
  };

  const viewImageByDate = async () => {
    if (!selectedDate) {
      return alert('Please select a date.');
    }

    try {
      const response = await axios.get(`/api/bills/by-date?date=${selectedDate}`);
      if (response.status === 200) {
        window.open(`${import.meta.env.VITE_BACKEND_URL}/api/bills/by-date?date=${selectedDate}`, '_blank');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to fetch image.');
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Bills Upload</h1>

      {!todayImageId && (
        <div>
          <form onSubmit={handleUpload} encType="multipart/form-data">
            <input type="file" name="image" accept="image/png, image/jpeg" required />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}

      {todayImageId && (
        <div>
          <p>You have already uploaded today's image.</p>
          <button onClick={viewTodayImage}>View Today's Bill</button>
        </div>
      )}
      <br />
      <div>
        <h3>View Bill by Date</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={viewImageByDate}>View</button>
      </div>
    </div>
  );
};

export default Bills;
