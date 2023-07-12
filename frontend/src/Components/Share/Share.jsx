import '../../CSS/Share.css'
import { BiImage } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'


const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const [imageList, setImageList] = useState([])

    const imageListRef = ref(storage, "images/")
    const { user } = useContext(AuthContext);
    // console.log(file)

    const uploadImage = () => {
        if (file == null) return;
        const imageRef = ref(storage, `images/${file.name}`);
        // console.log(imageRef)
        uploadBytes(imageRef, file).then(() => {
            getDownloadURL(snapshot.ref).then((url) => {
                alert("Image Uploaded")
                setImageList((prev) => [...prev, url])
            })

        });

    }
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
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={user.profilePic} alt="" />
                        <input
                            type="text"
                            placeholder={`What's on your mind ${user.username}?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img className="file" alt="" src={url} />
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
                        <div className="item">
                            <FaUserFriends className="icon" />
                            <span>Tag Friends</span>
                        </div>
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
