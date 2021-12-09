import React from 'react';
import './newProduct.css';

const newProduct = () => {
    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input 
                        type="file" 
                        id="file"
                    />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input 
                        name="title"
                        type="text" 
                        placeholder="Title..." 
                    />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input 
                        name="desc"
                        type="text" 
                        placeholder="Description..." 
                    />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input 
                        name="price"
                        type="number" 
                        placeholder="Price..." 
                    />
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input 
                        type="text"
                        placeholder=""
                    />
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <select name="inStock">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button className="addProductButton">Create</button>
            </form>
        </div>
    )
}

export default newProduct
