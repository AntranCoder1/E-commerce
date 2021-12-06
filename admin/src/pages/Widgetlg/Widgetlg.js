import React, { useEffect, useState } from 'react';
import './Widgetlg.css';
import { userRequest } from '../../requestMethod';
import { format } from 'timeago.js';

const Widgetlg = () => {

    const [order, setOrder] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await userRequest.get("/orders");
                setOrder(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getOrder();
    },[]);

    const Button = ({ type }) => {
        return <button className={"widgetlgButton " + type}>{type}</button>
    }

    return (
        <div className="Widgetlg">
            <h3 className="widgetlgTitle">Latest transactions</h3>
            <table className="widgetlgTable">
                <tr className="widgetlgTr">
                    <th className="widgetlgTh">Customer</th>
                    <th className="widgetlgTh">Date</th>
                    <th className="widgetlgTh">Amount</th>
                    <th className="widgetlgTh">Status</th>
                </tr>
                { order.map(item => (
                    <tr className="widgetlgTr" key={item._id}>
                        <td className="widgetlgUser">
                            <img 
                                src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" 
                                alt="" 
                                className="widgetlgImg" 
                            />
                            <span className="widgetlgName">{item.userId}</span>
                        </td>
                        <td className="widgetlgDate">{format(item.createdAt)}</td>
                        <td className="widgetlgAmount">${item.amount}</td>
                        <td className="widgetlgStatus">
                            <Button type={item.status}/>
                        </td>
                    </tr>
                )) }
            </table>
        </div>
    )
}

export default Widgetlg
