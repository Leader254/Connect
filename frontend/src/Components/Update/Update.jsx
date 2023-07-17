/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../CSS/Update.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';

const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        country: user.country,
    });

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return axios.put(`${apiDomain}/api/users`, user);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['user']);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();

        let coverUrl = user.coverPic;
        let profileUrl = user.profilePic;

        if (cover) {
            coverUrl = await uploadImage(cover);
        }

        if (profile) {
            profileUrl = await uploadImage(profile);
        }

        mutation.mutate({
            ...texts,
            coverPic: coverUrl,
            profilePic: profileUrl,
        });

        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    };

    const uploadImage = async (file) => {
        const imageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        const imgUrl = await getDownloadURL(imageRef);
        return imgUrl;
    };

    return (
        <div className="update">
            <div className="wrapper">
                <h1>Update Your Profile</h1>
                <form>
                    <div className="files">
                        <label htmlFor="cover">
                            <span>Cover Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        cover
                                            ? URL.createObjectURL(cover)
                                            : "/images/" + user.coverPic
                                    }
                                    alt=""
                                />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            style={{ display: 'none' }}
                            onChange={(e) => setCover(e.target.files[0])}
                        />
                        <label htmlFor="profile">
                            <span>Profile Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        profile
                                            ? URL.createObjectURL(profile)
                                            : "/images" + user.profilePic
                                    }
                                    alt=""
                                />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile"
                            style={{ display: 'none' }}
                            onChange={(e) => setProfile(e.target.files[0])}
                        />
                    </div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={texts.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <label>Username</label>
                    <input
                        type="text"
                        value={texts.username}
                        name="usernae"
                        onChange={handleChange}
                    />
                    <label>Fullname</label>
                    <input
                        type="text"
                        value={texts.fullname}
                        name="fullname"
                        onChange={handleChange}
                    />
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={texts.country}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Update</button>
                </form>
                <button className="close" onClick={() => setOpenUpdate(false)}>
                    close
                </button>
            </div>
        </div>
    );
};

export default Update;
