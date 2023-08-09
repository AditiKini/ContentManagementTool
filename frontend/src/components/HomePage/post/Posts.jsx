import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { useSearchParams, Link } from 'react-router-dom';
import { API } from '../../../service/api';

//components
import Post from './Postt';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [category]);

    return (
        <>
            {
                <Grid container spacing={2}> 
                    {posts?.length ? (
                        posts.map((post) => (
                            <Grid item lg={3} sm={2} md={4} xs={12} key={post._id}> 
                                <Link to={`/details/${post._id}`} style={{textDecoration : 'none', color: 'inherit'}}> 
                                    <Post post={post} />
                                </Link>
                            </Grid>
                        ))
                    ) : (
                        <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                            No data is available for the selected category
                        </Box>
                    )}
                </Grid>
            }
        </>
    )
}

export default Posts;