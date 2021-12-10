import React, { useState } from 'react';
import './UserEdit.css';
import { 
    CalendarToday, 
    LocationSearching, 
    MailOutline, 
    PermIdentity, 
    PhoneAndroid, 
    Publish 
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserEdit = () => {

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    const user = useSelector(state => 
        state.users.users.find((item) => item._id === userId)
    );

    return (
        <div className="userEdit">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                    <Link to="/create">
                        <button className="userAddButton">Create</button>   
                    </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img 
                            src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUserName">{user.username}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Detail</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.fullname}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">10.12.1999</span>
                        </div>
                        <span className="userShowTitle">Contact Detail</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">+84 {user.phone}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">HCM | VN</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    placeholder={user.username} 
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder={user.fullname}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    placeholder={user.email}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input 
                                    type="text" 
                                    placeholder={user.phone} 
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input 
                                    type="text" 
                                    placeholder="35/10/5 Phan Văn Hơn, q12" 
                                    className="userUpdateInput"
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img 
                                    src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} 
                                    alt=""
                                    className="userUpdateImg"
                                />
                                <label htmlFor="file"><Publish className="userUpdateIcon" /></label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserEdit

