import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React, { useContext,  useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../contexts/AuthContext';
import TableList, { filterProps }  from '../../components/TableList';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';




function Students() {
    const [checkAll, setCheckAll] = useState(false)
    const router= useRouter()
    const context = useContext(AuthContext)
    const { 
        studentList, 
        setStudentList,
        studentNameText,
        oldText,
        classText,
        cityText,
    }:any = context
    const addItem: () => void = ()=> {
       studentList.unshift({
            isEdit: true,
            studentName: "",
            old: "",
            class: "",
            city: "",
       })
       const dt = studentList.map((c:any)=> {return c})
        setStudentList(dt) 
    }
    const onCheckBoxAllItem = (value:boolean) => {
        const dt = studentList.map((c:any) => {
            if(c.id){
                c.isChecked = value
            }
            return c
        })
        setStudentList(dt)
        setCheckAll(value)
    }

    const deleteAll =()=>{
        const dt = studentList.filter((f:filterProps) => f.isChecked !== true)
        setStudentList(dt)  
    }
  return (
    <>
    <Navbar/>
    <Box sx={{marginTop: " 80px", marginLeft:"100px"}}><Button sx={{backgroundColor: "Highlight", color:"yellow", }} onClick={() => router.push('/teachers')}>quản lý giáo viên</Button></Box>
    <Box sx={{ width: '100%',  textAlign:"center"}}>
                            <h1>quan ly hoc sinh</h1>
                            
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
                                                <TableCell  align='right'>old</TableCell>
                                                <TableCell  align='right'>city</TableCell>
                                            <TableCell align='right'>
                                                <Button sx={{ color: "#fff", bgcolor: "#00AB55" }}>
                                                    <AddIcon onClick={()=> addItem()}/>
                                                </Button>
                                                <IconButton onClick={() => deleteAll()}>
                                                    <CloseIcon sx={{ color: "red" }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                            <TableList studentList={studentList} setStudentList={setStudentList} setCheckAll={setCheckAll}/>
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </Paper>
                          </Box>
    </>
                        
            
  )
}

export default Students