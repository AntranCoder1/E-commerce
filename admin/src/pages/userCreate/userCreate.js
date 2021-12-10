import React, { useState } from 'react';
import './userCreate.css';
import { addUsers } from '../../redux/ApiCall';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage';
import app from '../../filebase';

const UserCreate = () => {

    const [input, setInput] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        setInput(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;
                default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const user = { ...input, img: downloadURL };
                    addUsers(user, dispatch);
                    history.push("/users");
                });
            }
        );
    }

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
                        onChange={handleChange}
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Full Name</label>
                    <input 
                        type="text" 
                        name="fullname"
                        placeholder="full name" 
                        onChange={handleChange}
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Email</label>
                    <input 
                        type="text" 
                        name="email"
                        placeholder="email" 
                        onChange={handleChange}
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Password</label>
                    <input 
                        type="text" 
                        name="password"
                        placeholder="password" 
                        onChange={handleChange}
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Phone</label>
                    <input 
                        type="text" 
                        name="phone"
                        placeholder="phone" 
                        onChange={handleChange}
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Address</label>
                    <input 
                        type="text" 
                        name="address"
                        placeholder="address" 
                        onChange={handleChange}
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
                    <select 
                        className="userCreateSelect" 
                        name="isAdmin" 
                        id="admin"
                        onChange={handleChange}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="createUserItem">
                    <label>Image</label>
                    <input 
                        type="file" 
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <button 
                    className="userCreateButton"
                    onClick={handleClick}
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default UserCreate
