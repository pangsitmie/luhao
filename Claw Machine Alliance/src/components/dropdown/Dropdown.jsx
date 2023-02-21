import React, { useState } from 'react';



const Dropdown = ({ title, items }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        console.log(`Selected item: ${item}`);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {title}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {items.map((item, index) => (
                    <button key={index} className="dropdown-item" onClick={() => handleItemClick(item)}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Dropdown
