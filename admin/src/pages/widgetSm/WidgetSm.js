import React, { useEffect, useState } from 'react';
import './WidgetSm.css';
import { Visibility } from '@material-ui/icons';
import { userRequest } from '../../requestMethod';

const WidgetSm = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await userRequest.get("/users/?new=true");
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, []);

    return (
        <div className="widgetsm">
            <span className="widgetsmTitle">New Join Members</span>
            <ul className="widgetsmList">
                { user.map(item => (
                    <li className="widgetsmListItem" key={item._id}>
                        <img 
                            src={item.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} 
                            alt="" 
                            className="widgetsmImg" 
                        />
                        <div className="widgetsmuser">
                            <span className="widgetsmUsername">{item.username}</span>
                        </div>
                        <button className="widgetsmButton">
                            <Visibility className="widgetsmIcon" />
                            Display
                        </button>
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default WidgetSm
