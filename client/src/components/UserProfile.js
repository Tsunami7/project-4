/**
 * Component to show user Image and Social Media
 */

import React from 'react';


function UserProfile(props) {
    return (
        <div>
            <img src={props.user.image_link} alt=''></img>
            <p>{props.user.social_url}</p>
        </div >
    )
}


export default UserProfile;