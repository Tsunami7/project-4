import React from 'react';
import '../styles/UserProfile.css'


function UserProfile(props) {
    return (
        <div>
            <img className='user-images' src={props.user.image_link} alt=''></img>
            <p>check user social here: <a href={props.user.social_url}>{props.user.social_url}</a></p>
        </div >
    )
}


export default UserProfile;