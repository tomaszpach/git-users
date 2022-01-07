import React, {useEffect, useRef} from 'react'

const UserTile = ({ activeClassName, userData, getRef }) => {
    const tileRef = useRef(null);
    useEffect(() => {
        activeClassName && getRef(tileRef);
    })

    return (
        <a data-testid="tileHref" ref={tileRef} href={userData.html_url} className={`user-tile ${activeClassName}`}>
            <img src={userData.avatar_url} alt="avatar url"/>
            <div className="user-details">
                Login: {userData.login}
                <span className="id">{userData.id}</span>
            </div>
        </a>
    )
}

export default UserTile;
