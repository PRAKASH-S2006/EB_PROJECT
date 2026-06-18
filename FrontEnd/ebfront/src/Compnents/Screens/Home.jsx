import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'; 
function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://eb-project-hy27.onrender.com/api/Data/?page=${currentPage}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setTotalPages(data.total_pages);
      });
  }, [search, currentPage]);

  return (
    <div>
      <h1>Applications</h1>

      <input
        type="text"
        placeholder="Search Applicant Name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Connection Number</th>
            <th>Editing</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.Name}</td>
              <td>{user.gender}</td>
              <td>{user.Con_Num}</td>
              <td>
                <Link to={`/edit/${user.Con_Num}`}type="button">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>
        Page {currentPage} of {totalPages}
      </h3>

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default App;