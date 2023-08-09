import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { API } from '../../service/api';
import { DataContext } from '../../context/dataProvider';
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    font-family: 'Baloo Bhaina 2', cursive;
    color : #f57c00;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    flexDirection : 'column',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const Description = styled(Typography)`
   word-break : break-word;
`;

const DescriptionBox = styled(Box)`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius : 5px;
  
`;

const DetailsPage = () => {
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const { id } = useParams();
    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    const deletePost = async () => {
        let response = await API.deleteBlog(post._id);
        if(response.isSuccess)
           navigate('/');
    }

    return (
        <Container>
            <Image src={url} alt="post" />
            <Box style={{ float: 'right' }}>
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon color="success" /></Link>
                        <DeleteIcon onClick={() => deletePost()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
               
                {/* <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}> */}
                    <Typography>Author: <span style={{ fontWeight: 600, color : 'black'}}>{post.username}</span></Typography>
                {/* </Link> */}
                    <Typography style={{ display: 'block' }}>{new Date(post.createdDate).toDateString()}</Typography>
                
                
            </Author>

            <DescriptionBox>
                <Description>{post.description}</Description>
            </DescriptionBox>
            <Comments post={post} />
        </Container>
    )
}

export default DetailsPage;