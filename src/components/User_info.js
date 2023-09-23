import React, { useState, useEffect } from "react";

function User_info() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [showSearchList, setShowSearchList] = useState(false); // Control search list visibility

  useEffect(() => {
    // Fetch user data from API and set it to the 'users' state
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedUsers(filteredUsers);
  }, [users, searchTerm]);

  useEffect(() => {
    // Retrieve search history from localStorage on component mount
    const storedSearchHistory = localStorage.getItem("searchHistory");
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
  }, []);

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchHistory([...searchHistory, newSearchTerm]);
    // Store updated search history in localStorage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  };

  const handleSort = () => {
    const sorted = [...sortedUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedUsers(sorted);
  };

  const toggleSearchList = () => {
    setShowSearchList(!showSearchList);
  };

  return (
    <div>
      <header>
        <input
          type="text"
          placeholder="Search User By Name"
          onChange={handleSearch}
        />

        <button className="search-btn" onClick={toggleSearchList}>
          {showSearchList ? "Hide Search List" : "Show Search List"}
        </button>
      </header>

      <div className="content">
        <div>
          <div className="user-data">
            <div className="list-head">
              <p>User's List</p>
              <button className="sort-btn" onClick={handleSort}>
                Sort by Name
              </button>
            </div>
            <div className="name-list">
              <UserList users={sortedUsers} />
            </div>
          </div>
        </div>
        <div className="search-list">
          
          {showSearchList && (
            <>
              <SearchHistory history={searchHistory} />
            </>
          )}
        </div>
      </div>

    </div>
  );
}

function SearchHistory({ history }) {
  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {history.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li
          className="name"
          key={user.id}><p style={{display:"inline"}}>Name : </p>{user.name}
          
          <li>
          <p style={{display:"inline" }}>Email : </p>
            {user.email}</li>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User_info;
