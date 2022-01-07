import React from 'react'
import '../UserTile/styles/UserTile.scss'
import UserTile from "../UserTile/UserTile";

const UsersData = ({ activeElement, data, activeElementRef }) => {
    const switchCases = (data) => {
        switch (true) {
            case data?.total_count > 0:
                return (<div className="user-data">
                    <h2>Users found:</h2>
                    {data?.items && data.items.map((user, index) => <UserTile key={index} userData={user} activeClassName={activeElement === index ? 'active' : ''} getRef={(ref) => activeElementRef(ref)} />)}
                </div>);
            case data?.message:
                return <div>{data.message}</div>
            case data?.total_count === 0:
                return <div>Nothing found. Try search different git user</div>
            default:
                return null;
        }
    }

    return switchCases(data);


    // return (
        // data?.total_count > 0 ? (
        //     <div className="user-data">
        //         <h2>Users found:</h2>
        //         {data?.items && data.items.map((user, index) => <UserTile userData={user} activeClassName={activeElement === index ? 'active' : ''} />)}
        //     </div>
        // ) : data?.message ? <div>{data.message}</div> :  <div>Nothing found</div>
    // )
}

export default UsersData;
