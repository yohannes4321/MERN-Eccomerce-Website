import React, { useEffect, useState } from 'react';
import SummaryApi from "../common/index.js";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]); // Initialize as an empty array

  const fetchAllUser = async () => {
    try {
      const datareq = await fetch(SummaryApi.all_user.url, {
        method: SummaryApi.all_user.method,
        credentials: "include",
      });
      const datares = await datareq.json();
      if (datares.success) {
        console.log(datares);
        setAllUser(datares.users || []); // Ensure it's an array or fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {Array.isArray(allUser) && allUser.length > 0 ? ( // Check if allUser is an array and not empty
          allUser.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))
        ) : (
          <li>No users found</li> // Handle empty state
        )}
      </ul>
    </div>
  );
};

export default AllUsers;
