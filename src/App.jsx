import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //json-server --watch src/data/db.json
  const [assignments, setAssignments] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
     setLoading(true);
      const response = await fetch('http://localhost:3000/assignments');
      const result = await response.json();

      // Update state with the fetched data
      setAssignments(result);
    } catch (error) {
      // Handle errors
      setError(error);
    } finally {
      // Set loading to false after fetching data, whether successful or not
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array [] ensures the effect runs only once when the component mounts

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }
  console.log(assignments)
  return (
    <main>
    <h1>My Assignments from CS50C</h1>
    <ol>
      {assignments.map(assignment => {
       return (<li key={assignment.id}>
        <h3><a href={assignment.url} alt={assignment.alt} target="_blank" rel='noreferrer'>{assignment.title}</a></h3>
        <a href={assignment.url} target="_blank" rel='noreferrer'><img src={assignment.imagepath} /></a>
        <p>{assignment.description}<br /> {assignment.date}</p>
        <hr />
        </li>)
      })}
    </ol>
  </main>
  )
}

export default App
