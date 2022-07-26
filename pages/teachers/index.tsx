import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar'
import TeacherList from '../../components/TeacherList'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../contexts/AuthContext'
import { filterProps } from '../../components/TableList';

function Teacher() {
  const [checkAll, setCheckAll] = useState(false)
  const context = useContext(AuthContext)
  const { 
    teacherList,
    setTeacherList
}:any = context
console.log(teacherList)
const addItem: () => void = ()=> {
  teacherList.unshift({
       isEdit: true,
       studentName: "",
       old: "",
       class: "",
       city: "",
  })
  const dt = teacherList.map((c:any)=> {return c})
   setTeacherList(dt) 
}
const onCheckBoxAllItem = (value:boolean) => {
   const dt = teacherList.map((c:any) => {
       if(c.id){
           c.isChecked = value
       }
       return c
   })
   setTeacherList(dt)
   setCheckAll(value)
}

const deleteAll =()=>{
   const dt = teacherList.filter((f:filterProps) => f.isChecked !== true)
   setTeacherList(dt)  
}

  return (
    <>
    <Navbar/>
    <Box sx={{ width: '100%', marginTop:"100px", textAlign:"center"}}>
          <h1>quan ly giao vien</h1>
                            <Paper sx={{ width: '80%', margin:"auto" }}>
                                <TableContainer>
                                <Table>
                                    <TableHead sx={{background: "#F4F6F8", color:"#637381"}}>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                            <Checkbox onChange={(e) => onCheckBoxAllItem(e.target.checked)} checked={checkAll}/>
                                            </TableCell>
                                                <TableCell  align='right'>Name</TableCell>
                                                <TableCell  align='right'>class</TableCell>
                                                <TableCell  align='right'>subject</TableCell>
                                                <TableCell  align='right'>city</TableCell>
                                            <TableCell align='right'>
                                                <Button sx={{ color: "#fff", bgcolor: "#00AB55" }}  onClick={()=> addItem()}>
                                                    <AddIcon/>
                                                </Button>
                                                <IconButton onClick={() => deleteAll()}>
                                                    <CloseIcon sx={{ color: "red" }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                            <TeacherList  setCheckAll={setCheckAll}/>
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </Paper>
                          </Box>
    </>
  )
}

export default Teacher