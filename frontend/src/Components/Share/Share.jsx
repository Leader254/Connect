import '../../CSS/Share.css'
import { BiImage } from 'react-icons/bi'
// import { FaUserFriends } from 'react-icons/fa'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { toast } from 'react-toastify'
import Loading from '../../Pages/Loading/Loading';


const Share = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [imageList, setImageList] = useState([])
    const [loading, setLoading] = useState(false)

    const imageListRef = ref(storage, "images/")
    const { user } = useContext(AuthContext);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newPost) => {
            return axios.post(`${apiDomain}/api/posts`, newPost);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );
    // console.log(file)

    const uploadImage = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (file == null) return;

        let imgUrl = "";
        if (file) {
            const imageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(imageRef, file);
            imgUrl = await getDownloadURL(imageRef);
        }

        const newPost = {
            description: description,
            userId: user.id,
            createdAt: new Date().toISOString(),
            image: imgUrl,
        };

        mutation.mutate(newPost);
        setLoading(false)

        setFile(null);
        setDescription("");
        toast.success("Post created successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoclose: 1000
        });
    };


    useEffect(() => {
        listAll(imageListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                })
            })
        })
    }, [])

    return (
        <div className="share">
            {loading && <Loading />}
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={user.profilePic} alt="" />
                        <input
                            type="text"
                            placeholder={`What's on your mind ${user.username}?`}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img className="file" alt="" src={URL.createObjectURL(file)} />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <BiImage className="icon" />
                                <span>Add Image</span>
                            </div>
                        </label>
                    </div>
                    <div className="right">
                        <button onClick={uploadImage}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
