import './Post.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';

import { API } from '../../service/api';
import { DataContext } from '../../context/dataProvider';



const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const initialPostVal = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const Post = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPostVal);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://cdn1.vectorstock.com/i/1000x1000/58/95/blogging-letter-banner-flat-vector-23865895.jpg';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const bannerInfo = new FormData();
                bannerInfo.append("name", file.name);
                bannerInfo.append("file", file);

                const response = await API.uploadFile(bannerInfo);
                post.picture = response.data;
            }
        }
        getImage();
        post.category = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file])

    const savePost = async () => {
        let response = await API.savingPost(post);
        if (response.isSuccess) {
            navigate('/');
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <img src={url} alt="post" className='banner' />

            <FormControl className='form'>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputBase className='text-field' onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" style={{ backgroundColor: '#f57c00' }}>Publish</Button>
            </FormControl>

            <TextareaAutosize className='textarea'
                minRows={5}
                placeholder="Write your blog..."
                name='description'
                onChange={(e) => handleChange(e)}
            />
        </Container>
    )
}

export default Post;


//https://www.esearchadvisors.com/blog/wp-content/uploads/2018/12/ESA-Blog-Banner.jpg