import { styled, Box, Typography } from '@mui/material';

// css part 
const Div = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 300px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Img = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Type = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Title = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Description = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Div>
            <Img src={url} alt="post" />
            <Type>{post.category}</Type>
            <Title>{addEllipsis(post.title, 20)}</Title>
            <Typography>Author: {post.username}</Typography>
            <Description>{addEllipsis(post.description, 50)}</Description>
        </Div>
    )
}

export default Post;