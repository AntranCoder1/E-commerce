import React, { useEffect, useState } from 'react';
import './UserList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/ApiCall';

const UserList = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const handleChangeDelete = (id) => {
        //setUser(user.filter(item => item.id !== id));
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'username', headerName: 'User name', width: 300, renderCell: (params) => {
            return (
                <div className="userListUser">
                    <img src={params.row.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="userListImg" />
                    {params.row.username}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'isAdmin', headerName: 'Admin', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/users/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleChangeDelete(params.id)} />
                    </>
                )
            }
        }
    ];

    return (
        <div className="userList">
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}

export default UserList
