import React, { useEffect } from 'react';
import './Product.css';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, deleteProducts } from '../../redux/ApiCall';

const Product = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleChangeDelete = (id) => {
        deleteProducts(id, dispatch);
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'img', headerName: 'Product Image', width: 170, renderCell: (params) => {
            return (
                <div className="userListUser">
                    <img src={params.row.img} alt="" className="userListImg" />
                </div>
            )
        } },
        { field: 'title', headerName: 'Product Name', width: 200 },
        { field: 'price', headerName: 'Product Price', width: 170 },
        { field: "inStock", headerName: "Stock", width: 120 },
        { field: "size", headerName: "Size", width: 200 },
        { field: "color", headerName: "Color", width: 200 },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => {
            return (
                <>
                    <Link to={"/products/" + params.row._id}>
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="userListDelete" onClick={() => handleChangeDelete(params.row._id)} />
                </>
            )
        } }
    ]

    return (
        <div className="product">
            <DataGrid
                rows={products}
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

export default Product
