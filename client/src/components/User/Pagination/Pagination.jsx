import * as React from 'react';
import { Pagination, Stack } from '@mui/material';





function Paginations({limit,setPage,page,total}) {

    const totalPage= Math.ceil(total/limit)
    const handleChange = (event, value) =>{
       setPage(value) 
    }

  return (
    <div className='mb-10 ml-96 mt-10'>
    <Stack spacing={2}>

      <Pagination count={totalPage} color="primary" page={page} onChange={handleChange} />

    </Stack>
    </div>
  );
}
export default Paginations