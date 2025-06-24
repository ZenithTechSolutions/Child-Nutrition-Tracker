import { useState, useEffect } from 'react';
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
      const res = await fetch('http://localhost:5000/api/bills/today');
      const data = await res.json();

      if (data.imageId) {
        setTodayImageId(data.imageId);
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
      const response = await fetch('http://localhost:5000/api/bills/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Upload failed.');
      console.error(error);
    }
  };

  const viewTodayImage = () => {
    if (todayImageId) {
      window.open(`http://localhost:5000/api/bills/${todayImageId}`, '_blank');
    }
  };

  const viewImageByDate = async () => {
    if (!selectedDate) {
      return alert('Please select a date.');
    }

    try {
      const response = await fetch(`http://localhost:5000/api/bills/by-date?date=${selectedDate}`);
      if (response.ok) {
        window.open(`http://localhost:5000/api/bills/by-date?date=${selectedDate}`, '_blank');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Image not found');
      }
    } catch (err) {
      alert('Failed to fetch image.');
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Bills Upload</h1>

      {/* Upload Form */}
      {!todayImageId && (
        <div>
          <form onSubmit={handleUpload} encType="multipart/form-data">
            <input type="file" name="image" accept="image/png, image/jpeg" required />
            <button type="submit">Upload</button>
          </form>
        </div>
      )}

      {/* View Today's Image */}
      {todayImageId && (
        <div>
          <p>You have already uploaded today's image.</p>
          <button onClick={viewTodayImage}>View Today's Bill</button>
        </div>
      )}
      <br />
      {/* Search By Date */}
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
