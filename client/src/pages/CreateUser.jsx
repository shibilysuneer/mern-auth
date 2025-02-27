import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { validateEmail,validateUsername,validatePassword } from '../../validation';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
      });
      const [loading, setLoading] = useState(false);
      const [errors,setErrors] = useState(false)
      const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
        validateField(name, value);
      };

      const validateField = (name, value) => {
        let errorMsg = '';
    
        if (name === 'username' && !validateUsername(value)) {
          errorMsg = 'Username must be 3-15 characters (letters, numbers, underscores).';
        }
        if (name === 'email' && !validateEmail(value)) {
          errorMsg = 'Invalid email format.';
        }
        if (name === 'password' && !validatePassword(value)) {
          errorMsg = 'Password must be at least 4 characters with a letter, number, and special character.';
        }
    
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: errorMsg,
        }));
      };

      const handleSubmit =  async (e) => {
        e.preventDefault();

        if (!validateUsername(formData.username)) {
            setErrors((prev) => ({ ...prev, username: 'Invalid username.' }));
            return;
          }
          if (!validateEmail(formData.email)) {
            setErrors((prev) => ({ ...prev, email: 'Invalid email.' }));
            return;
          }
          if (!validatePassword(formData.password)) {
            setErrors((prev) => ({ ...prev, password: 'Weak password.' }));
            return;
          }

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
         {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div className="mb-4">
            <label className="block font-medium">Email</label>
            <input type="email" name="email"  value={formData.email}
            onChange={handleChange} className="w-full p-2 border rounded"/> 
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
            <label className="block font-medium">Password</label>
            <input type="password" name="password" value={formData.password}
            onChange={handleChange} className="w-full p-2 border rounded"/> 
         {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  )
}

export default CreateUser;
