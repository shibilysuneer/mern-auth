import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
      });
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };

      const handleSubmit =  async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const res = await fetch("/api/admin/users/createuser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();
          setLoading(false);
    
          if (data.success) {
            Swal.fire("Success", "User created successfully!", "success");
            navigate("/admin/dashboard");
          } else {
            Swal.fire("Error", data.message || "Failed to create user", "error");
          }
        } catch (error) {
          setLoading(false);
          Swal.fire("Error", "Something went wrong", "error");
        }
      };
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block font-medium">Username</label>
            <input type="text" name="username" value={formData.username}
             className="w-full p-2 border rounded"  onChange={handleChange}/> 
        </div>

        <div className="mb-4">
            <label className="block font-medium">Email</label>
            <input type="email" name="email"  value={formData.email}
            onChange={handleChange} className="w-full p-2 border rounded"/> 
        </div>

        <div className="mb-4">
            <label className="block font-medium">Password</label>
            <input type="password" name="password" value={formData.password}
            onChange={handleChange} className="w-full p-2 border rounded"/> 
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Make Admin</label>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        //   disabled={loading}
        >create user
          {/* {loading ? "Creating..." : "Create User"} */}
        </button>
      </form>
    </div>
  )
}

export default CreateUser;
