import React,{useState} from 'react'

const Attendence = () => {
  const [attendence,setAttendence] = useState([])

  const fetchAttendence = async() =>{
    try{
await fetch(`http://localhost:5000/api/mark-attendance/${studentId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ present: true }) // or false
});
      const data =await response.json()
      setAttendence(data)
    }
    catch(error){
      console.error("Error fetching attendence data:",error)
    }
  }
  return (
    <div>
      <h2>Attendence</h2>
      {attendence.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <ul>
          {attendence.map((entry, index) => (
            <li key={index}>
              {entry.name}: {entry.present ? 'Present' : 'Absent'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Attendence