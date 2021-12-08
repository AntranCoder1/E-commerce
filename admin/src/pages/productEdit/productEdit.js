import React from 'react';
import './productEdit.css';
import { Link } from 'react-router-dom';
import Chart from '../chart/Chart';
import { productData } from '../../data';
import './productEdit.css';
import { Publish } from '@material-ui/icons';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const ProductEdit = () => {

    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const product = useSelector((state) => 
        state.product.products.find((item) => item._id === productId)
    );
    console.log(product.inStock)

    return (
        <div className="productEdit">
            <div className="productEditContainer">
                <h1 className="productEditTitle">Product</h1>
                <Link to="/newProduct">
                    <button className="productEditAddButton">Create</button>
                </Link>
            </div>
            <div className="productEditTop">
                <div className="productEditTopLeft">
                    <Chart title="Sales Performance" data={productData} grid datakey="sales" />
                </div>
                <div className="productEditTopRight">
                    <div className="productEditInfoTop">
                        <img src={product.img} alt="" className="productEditImg" />
                        <span className="productEditName">{product.title}</span>
                    </div>
                    <div className="productEditInfoBottom">
                        <div className="productEditInfoItem">
                            <div className="productEditInfoKey">id: </div>
                            <div className="productEditInfoValue">{product._id}</div>
                        </div>
                        <div className="productEditInfoItem">
                            <div className="productEditInfoKey">sales: </div>
                            <div className="productEditInfoValue">5123</div>
                        </div>
                        <div className="productEditInfoItem">
                            <span className="productInfoKey">inStock: </span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productEditBottom">
                <form className="productEditForm">
                    <div className="productEditFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title} />
                        <label>Description</label>
                        <input type="text" placeholder={product.desc} />
                        <label>Price</label>
                        <input type="text" placeholder={product.price} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="true">Yes</option>
                            <option vlaue="false">No</option>
                        </select>
                    </div>
                    <div className="productEditFormRight">
                        <div className="productEditUpload">
                            <img src={product.img} alt="" className="productEditUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: 'none' }} />
                        </div>
                        <button className="productEditButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit
