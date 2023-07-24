/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../CSS/Update.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { makeRequest } from '../../utils/utils';
import Loading from '../../Pages/Loading/Loading';

const PostUpdate = ({ setOpenUpdate, post }) => {
    const [loading, setLoading] = useState(false);
    const [postImg, setPostImg] = useState(null);
    const [texts, setTexts] = useState({
        description: post.description || '',
    });

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (postData) => {
            return makeRequest.put(`/posts/${postData.postId}`, postData);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['post', post.id]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        if (post.userId !== JSON.parse(localStorage.getItem('user')).id) return toast.error('You can only update your own post', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
        });
        setLoading(true);

        let postImgUrl = post.image;

        if (postImg) {
            postImgUrl = await uploadImage(postImg);
        }

        mutation.mutate({
            postId: post.id,
            description: texts.description,
            image: postImgUrl,
        });

        toast.success('Post Updated Successfully', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
        });
        window.location.reload();
        setLoading(false);
        setOpenUpdate(false);
        setPostImg(null);
    };

    const uploadImage = async (file) => {
        const imageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        const imgUrl = await getDownloadURL(imageRef);
        return imgUrl;
    };

    return (
        <div className="update">
            {loading && <Loading />}
            <div className="wrapper wrap">
                <h1>Update Post</h1>
                <form>
                    <div className="files">
                        <label htmlFor="postImg">
                            <span>Post Image</span>
                            <div className="imgContainer">
                                <img
                                    src={postImg ? URL.createObjectURL(postImg) : post.image ? post.image : ''}
                                    alt=""
                                />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="postImg"
                            style={{ display: 'none' }}
                            onChange={(e) => setPostImg(e.target.files[0])}
                        />
                    </div>
                    <label>Post Description</label>
                    <textarea
                        type="text"
                        name="description"
                        value={texts.description}
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

export default PostUpdate;
