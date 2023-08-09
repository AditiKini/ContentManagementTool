import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { DataContext } from '../../../context/dataProvider';
import {API} from '../../../service/api';
import Comment from './Comment';

const  BOX = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Img = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const TextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue= {
    name: '',
    postId: '',
    comments: '',
    date: new Date()
    
}

export const Comments = ({ post }) => {

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const { account } = useContext(DataContext);

    const [toggle, setToggle] = useState(false);

    const url = 'https://static.thenounproject.com/png/12017-200.png';

    useEffect(() => {
        const getCommentData = async () => {
            const response = await API.getComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getCommentData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        let res = await API.addComments(comment);
        if (res.isSuccess){
            setComment(initialValue);   
        }
        setToggle(prevState => !prevState);
    }
    
    return (
        <Box>
            <BOX>
                <Img src={url} alt="dp" />   
                <TextArea
                    minRows={5} 
                    placeholder="Write Your Comment on it?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </BOX>
            <Box>
            {
                comments && comments.length > 0 && comments.map((comment) => (
                     <Comment comment={comment} setToggle={setToggle} key={comment._id} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;