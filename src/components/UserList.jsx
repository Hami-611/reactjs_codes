import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import '../App.css'

// Debounce utility
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

// Custom hook to debounce a callback
function useDebounce(callback, delay) {
  return useCallback(debounce(callback, delay), []);
}

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch data with axios
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Debounced search update
  const debouncedUpdate = useDebounce((value) => setDebouncedSearch(value), 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedUser(null); // Clear previous selection
    debouncedUpdate(value);
  };

  // Memoized filtered list
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, users]);

  const shouldShowList = debouncedSearch.trim().length > 0;

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Type to search users..."
        value={search}
        onChange={handleChange}
      />

      {shouldShowList && (
        <ul className="user-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user.name)}
                className="user-item"
              >
                👤 {user.name}
              </li>
            ))
          ) : (
            <li className="no-result">No users found.</li>
          )}
        </ul>
      )}

      {selectedUser && (
        <div className="selected-user">
          ✅ You selected: <strong>{selectedUser}</strong>
        </div>
      )}
    </div>
  );
}
