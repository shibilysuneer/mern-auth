import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const {currentUser} = useSelector((state) => state.user)
    const [userList,setUserList] = useState([])
    const [loading,setLoading] = useState(true)
    const [searchTerm,setSearchTerm] = useState('')

    const [currentPage,setCurrentPage] = useState(1)
    const [usersPerPage] = useState(5)
    const navigate = useNavigate();


    const getUserDetails = async () =>{
        try {
            const res = await fetch('/api/admin/users')
            const data = await res.json();
            console.log("Fetched users:", data);
            setUserList(data);
        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
          }
    }
    useEffect (() => {
       
        getUserDetails()
    },[]);
    
    const handleViewUser = (userId) => {
        return navigate(`/admin/users/${userId}`);
      };

    const filteredUsers = userList ?.filter((user) => {
        const searchValue = searchTerm.toLowerCase();
        return(
            user.username?.toLowerCase().includes(searchValue) ||
            user.email?.toLowerCase().includes(searchValue)
        )
    });

    
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-5xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">
        Admin Dashboard</h1>

       <div className='relative'>
        {/* search bar */}
        <input type="text" placeholder="Search by name or email..." value={searchTerm}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 pr-10"
        onChange={(e) => setSearchTerm(e.target.value)}/>

           {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2 "
            >
              <span className="font-semibold text-lg text-black  hover:text-gray-500">
                X
              </span>
            </button>
          )}

        </div>
        {/* Add new user */}
        <div className='flex justify-end mb-4'>
            <Link to='/admin/createUser' className="bg-purple-800 text-white px-4 py-2 rounded-lg">
            Add New User</Link>
        </div>

     <div className="rounded-md border overflow-x-auto ">
        <table className="w-full  border border-white">
          <thead className="bg-purple-600 text-slate-100">
            <tr>
            <th className="p-3 text-center">#</th>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Joined Date</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black">
            {currentUsers?.map((user, index) => (
              <tr key={index} className="bg-white hover:bg-gray-200">
                <td className="px-4 py-3 text-center font-medium">
                  {index+((currentPage-1)*5+1)}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.createdAt.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <span>{user.isAdmin ? "Admin" : "User"}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleViewUser(user._id)}
                    className="border-2 px-3 rounded-lg bg-slate-200 hover:bg-white"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {filteredUsers?.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-xl">
          No user found ,based on your search.
        </div>
      ) : (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-black rounded-full ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 border border-black rounded-full ${
                currentPage === index + 1
                  ? "bg-slate-800 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}


<button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-black rounded-full ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}





      </div>
  )
}

export default Dashboard;
