import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Button } from 'antd'
import React from 'react'

const UserListTable = ({users, handleButtonClick, blockUnblockUser}) => {
  
  return (
    <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell align='right'></TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell align="right">
                <Button className='bg-blue-800 text-white' onClick={ ()=>handleButtonClick(row)}>Options</Button>
              </TableCell>
              <TableCell align="right">
                <Button className='bg-red-800 text-white' onClick={ () => blockUnblockUser(row) }>{ row.isBlocked ? "Unblock" : "Block"}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserListTable
