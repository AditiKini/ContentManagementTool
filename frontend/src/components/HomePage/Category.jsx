
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { blogTypes } from '../../constants/data';
import './Category.css';

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <>
            <Link to={`/create?category=${category || ''}`} className='link'>
                <Button variant="contained" className='btn'>Create Blog</Button>
            </Link>

            <Table className='table'>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to={"/"} className='link'>
                                All Categories
                            </Link >
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        blogTypes.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <Link to={`/?category=${category.type}`} className='link'>
                                        {category.type}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Categories;