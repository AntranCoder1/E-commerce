import React from 'react';
import './userCreate.css';
import { addUsers } from '../../redux/ApiCall';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const userCreate = () => {
    return (
        <div className="userCreate">
            <h1 className="userCreateTitle">New User</h1>
            <form className="userCreateForm">
                <div className="createUserItem">
                    <label className="">Username</label>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="username" 
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Full Name</label>
                    <input 
                        type="text" 
                        name="fullname"
                        placeholder="full name" 
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Email</label>
                    <input 
                        type="text" 
                        name="email"
                        placeholder="email" 
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Password</label>
                    <input 
                        type="text" 
                        name="password"
                        placeholder="password" 
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Phone</label>
                    <input 
                        type="text" 
                        name="phone"
                        placeholder="phone" 
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Address</label>
                    <input 
                        type="text" 
                        name="address"
                        placeholder="address" 
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Gender</label>
                    <div className="userCreateGender">
                        <input type="radio" placeholder="gender" id="male" value="male" />
                        <label htmlFor="male">Male</label>
                        <input type="radio" placeholder="gender" id="female" value="female" />
                        <label htmlFor="female">Female</label>
                        <input type="radio" placeholder="gender" id="others" value="others" />
                        <label htmlFor="others">Others</label>
                    </div>
                </div>
                <div className="createUserItem">
                    <label>Admin</label>
                    <select className="userCreateSelect" name="isAdmin" id="admin">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="createUserItem">
                    <label>Image</label>
                    <input 
                        type="file" 
                        id="file"
                        // onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <button className="userCreateButton">Create</button>
            </form>
        </div>
    )
}

export default userCreate
