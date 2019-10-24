import React, { useEffect } from 'react';
import './Items.css';
import {
    Alert
} from 'react-bootstrap';
import { ItemList } from '../../models/itemlist';
import bmwUrl from '../../models/BMW.PNG';

export const ItemsPage = (props) => {
    return (
        <div className="itemspage">
            <span className="protitle">3d viewer</span>
            <br/>
            <Alert variant="secondary">All 3d objects would be listed out in this page</Alert>
            <br/>
            <div className="itemspane">
                {ItemList.map(obj => {
                    let bgStyle = {
                        backgroundImage: 'url(' + obj.image + ')'
                    };

                    return (
                        <div className="item" key={obj.id} style={bgStyle} onClick={() => props.history.push(`/model/${obj.id}`)}>
                            <h4 className="itemname">{obj.name}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}


function getPathToObj(fileName) {
    return `../../models/${fileName}`;
}
