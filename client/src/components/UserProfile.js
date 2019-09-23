import React from 'react';
import '../styles/UserProfile.css'


function UserProfile(props) {
    return (
        <div>
            <img className='user-images' src={props.user.image_link} alt=''></img>
            <h3 className='social-text'>Check User Social Here: <a href={props.user.social_url} target="_blank">{props.user.social_url}</a></h3>
        </div >
    )
}


export default UserProfile;