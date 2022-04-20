import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"

function ProfilePage(props) {
    const [profile, setProfile] = useState([])
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${props.cookies.auth_token}` },
          }
        axios.get("http://localhost:5016/profile/getprofile/", config)
        .then((res) => {
            setProfile(res.data[0])
        })
        .catch((error) => {
            console.log("There's an error: " + error)
        })
    }, [setProfile])


    return (
        <div>
            <p>Name: {profile.name}</p>
            <p>Year: {profile.year}</p>
            <p>Major: {profile.major}</p>
            <p>Desired Role: {profile.desiredRole}</p>
            <p>Username: {profile.username}</p>
            <p>Bio: {profile.bio}</p>
        </div>
    )
}

export default ProfilePage