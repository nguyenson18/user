import { Button, Checkbox, IconButton, TableCell, TableRow, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../pages/contexts/AuthContext'
import SaveIcon from '@mui/icons-material/Save';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { filterProps } from './TableList';
import apiService from '../pages/api/apiService';


function TeacherList({setCheckAll}:any) {
    
    const context = useContext(AuthContext)
  const { 
    teacherList,
    setTeacherList,
    setCityText,
    setOldText,
    setStudentNameText,
    setclassText 
}:any = context

const hanledDelete = async (rowId:number)=> {
     await apiService.delete(`https://62d6208f15ad24cbf2d1187f.mockapi.io/api/teachers/${rowId}`)
    const dt = teacherList.filter((f:filterProps) => f.id !== rowId)
    setTeacherList(dt)   
}

const hanldeSetItem = (rowId:number)=> {
   const dt = teacherList.map((c:filterProps)=> {
        if(c.id === rowId){
            c.isEdit= true   
        }
        return c
        })
    setTeacherList(dt)    
}
const hanldeSave = async(row:any)=> {
    const dt = teacherList.map((c:filterProps)=> {
        if(c.isEdit === row.isEdit){
            c.isEdit= false   
        }
        return c
        })
    if(row.id) {
        await apiService.put(`https://62d6208f15ad24cbf2d1187f.mockapi.io/api/teachers/${row.id}`, row)
    }else {
        await apiService.post(`https://62d6208f15ad24cbf2d1187f.mockapi.io/api/teachers`, row)
    }   
    setTeacherList(dt)    
}  
const onChangeItem =(payload:any)=> {
   
    const {name} = payload.event.target;
    const dt = teacherList.map((c:any)=> {
        if(c.id === payload.row.id){
            if(name === 'subject') {
                    c.subject = payload.value
                    setOldText(payload.value)
                } else if (name === 'name') {
                    c.name = payload.value
                    setStudentNameText(payload.value)
                }else if (name === 'class') {
                    c.class = payload.value
                    setclassText(payload.value)
                }else if (name === 'city') {
                    c.city = payload.value
                    setCityText(payload.value)
                }
        }
        return c
    })
    setTeacherList(dt)
}


const onCheckBoxItem = (payload:any)=> {
    console.log(payload.id);
    const dt = teacherList.map((c:filterProps)=> {
        if(c.id === payload.id && !payload.isChecked){
            payload.isChecked = true
        }else if(c.id === payload.id && payload.isChecked) {
            payload.isChecked = false
        }
        return c
    })
    const checkAll = !teacherList.find((e:any) => !e.isChecked);
    setCheckAll(checkAll)
    setTeacherList(dt)
}

  return (
    <>
    
    {teacherList.map((row:any) => (
                                     <TableRow
                                     key={row.id}
                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                     >
                                         <TableCell padding="checkbox">
                                             <Checkbox onChange={()=> onCheckBoxItem(row)} checked={row?.isChecked || false }/>
                                         </TableCell>
                                     <TableCell align='right' >
                                         {!row.isEdit ? (row.name) : (
                                             <TextField
                                             value={row?.name || ""}
                                             type="text"
                                             inputProps={{
                                                 name: 'name'
                                             }}
                                             onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> onChangeItem({value: e.target.value, row, event: e})}
                                             
                                         />
                                         )}
                                     </TableCell>
                                     <TableCell align='right'>
                                         {!row.isEdit ? (row.class) : (
                                             <TextField
                                             value={row?.class || ""}
                                             type="text"
                                             inputProps={{
                                                 name: 'class'
                                             }}
                                             onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> onChangeItem({row, value: e.target.value, event: e})}
                                         />
                                         )}
                                     </TableCell>
                                     <TableCell align='right'>
                                         {!row.isEdit ? (row.subject) : (
                                             <TextField
                                             value={row?.subject || ""}
                                             type="text"
                                             inputProps={{
                                                 name: 'subject'
                                             }}
                                             onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> onChangeItem({row, value: e.target.value, event: e})}
                                         />
                                         )}
                                     </TableCell>
                                     <TableCell align='right'>
                                         {!row.isEdit ? (row.city) : (
                                             <TextField
                                             value={row?.city || ""}
                                             type="text"
                                             inputProps={{
                                                 name: 'city'
                                             }}
                                             onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> onChangeItem({row, value: e.target.value, event: e})}
                                         />
                                         )}</TableCell>
                                     <TableCell align='right'>
                                             
                                     {row.isEdit ? (<>
                                 {/* <IconButton  onClick={()=> backItem(row)}>
                                 <ArrowBackIcon sx={{ color: "red" }} />
                                 </IconButton> */}
                                 <IconButton onClick={()=> hanldeSave(row)}>
                                 <SaveIcon sx={{ color: "#00AB55" }} />
                                  </IconButton>
                                     </>) : (<>
                                         <IconButton onClick={()=> hanldeSetItem(row.id)}>
                                             <CreateIcon sx={{ color: "#00AB55" }} />
                                         </IconButton>
                                         <IconButton onClick={()=> hanledDelete(row.id)}>
                                             <CloseIcon sx={{ color: "red" }} />
                                         </IconButton>
                                     </>)}
                                     </TableCell>
                                     </TableRow>
                                 ))}
 </>
  )
}

export default TeacherList