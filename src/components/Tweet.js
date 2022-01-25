import React, {useEffect, useState} from 'react';
//import {Link} from 'react-router-dom';

function Tweet() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/tweet');
        const items = await data.json();
        setItems(items);
    };

    return(
        <section>
            {
            items.map((item, index) => (
            <div key="thediv">
                <p key="name">{item.name}</p>
                <p key="msg">{item.msg}</p>
                <p key="username">{item.username}</p>
            </div>
            ))
            }
        </section>
    );
}

export default Tweet;