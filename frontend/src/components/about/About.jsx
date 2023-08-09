import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Email} from '@mui/icons-material';

const Banner = styled(Box)`
    margin-top: 60px;
    background-image: url(https://strattonleocommunication.com/wp-content/uploads/2016/08/about-us-banner.png);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3,
    & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: gray;
`;

const About = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3" style={{color:'#f57c00'}}>Aditi Kini</Typography>
                <Text variant="h5">
                    Hello! I am Aditi Kini, a student based in India, and I am passionate about web development and design.
                </Text>
                <Text variant="h5">
                    I have created a content management tool that allows users to easily create and manage their own blog website. The tool provides an intuitive interface for writing and organizing blog posts, customizing the website's appearance, and managing user interactions.
                </Text>
                <Text variant='h5' >
                If You Want to See My all work then check out my github account.
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/AditiKini" color="inherit" target="_blank">
                            <GitHub />
                        </Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    If you have any questions, project ideas, or just want to chat, feel free to reach out to me. You can connect with me on{' '}
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/aditi-kini-b3416223a/" color="inherit" target="_blank">
                            <LinkedIn />
                        </Link>
                    </Box>
                    {' or send me an Email '}
                    <Link href="mailto:aditikini4623@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>
                    .
                </Text>
            </Wrapper>
        </Box>
    );
};

export default About;
