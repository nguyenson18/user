import { Checkbox, IconButton, TableCell, TableRow, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import apiService from '../pages/api/apiService';
import SaveIcon from '@mui/icons-material/Save';
import { AuthContext } from '../pages/contexts/AuthContext';
import _, { remove } from 'lodash';

export interface filterProps  {
    studentName: string,
    old:string,
    city:string,
    class: string,
    id:number,
    isEdit: boolean | null,
    isChecked: boolean | null
}


function TableList({studentList, setStudentList, setCheckAll}:any) {
    const context = useContext(AuthContext)
    const {
        studentNameText,
        oldText,
        classText,
        cityText,
        setCityText,
        setOldText,
        setStudentNameText,
        setclassText 
    } = context
    const hanledDelete = async (rowId:number)=> {
         await apiService.delete(`https://62d6208f15ad24cbf2d1187f.mockapi.io/api/students/${rowId}`)
        const dt = studentList.filter((f:filterProps) => f.id !== rowId)
        setStudentList(dt)   
    }
    
    const hanldeSetItem = (rowId:number)=> {
       const dt = studentList.map((c:filterProps)=> {
            if(c.id === rowId){
                c.isEdit= true   
            }
            return c
            })
        setStudentList(dt)    
    }
    const hanldeSave = async(row:any)=> {
        const dt = studentList.map((c:filterProps)=> {
            if(c.isEdit === row.isEdit){
                c.isEdit= false   
            }
            return c
            })
        if(row.id) {
            await apiService.put(`https://62d6208f15ad24cbf2d1187f.mockapi.io/api/students/${row.id}`, row)
        }else {
            await apiService.post(`https://62d6208f15ad24cbf2d1187f.mockapi.io/api/students`, row)
        }   
        setStudentList(dt)    
    }  
    const onChangeItem =(payload:any)=> {
       
        const {name} = payload.event.target;
        const dt = studentList.map((c:filterProps)=> {
            if(c.id === payload.row.id){
                if(name === 'age') {
                        c.old = payload.value
                        setOldText(payload.value)
                    } else if (name === 'name') {
                        c.studentName = payload.value
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
        setStudentList(dt)
    }

    // const backItem = (payload:any) => {
    //    console.log(payload);
    //     const dt = studentList.map((c:filterProps)=> {
    //         if(c.id === payload.id){
    //             c.isEdit= false   
    //         }else if(!payload.id){
    //             c.isEdit= false
    //         }
    //         return c
    //         })
    //     setStudentList(dt)
    // }

    const onCheckBoxItem = (payload:any)=> {
        console.log(payload.id);
        const dt = studentList.map((c:filterProps)=> {
            if(c.id === payload.id && !payload.isChecked){
                payload.isChecked = true
            }else if(c.id === payload.id && payload.isChecked) {
                payload.isChecked = false
            }
            return c
        })
        const checkAll = !studentList.find((e:any) => !e.isChecked);
        setCheckAll(checkAll)
        setStudentList(dt)
    }

    
   return (
    <>
       {studentList.map((row:any) => (
                                        <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox onChange={()=> onCheckBoxItem(row)} checked={row?.isChecked || false }/>
                                            </TableCell>
                                        <TableCell align='right' >
                                            {!row.isEdit ? (row.studentName) : (
                                                <TextField
                                                value={row?.studentName || ""}
                                                type="text"
                                                inputProps={{
                                                    name: 'name'
                                                }}
                                                onChange={(e:any)=> onChangeItem({value: e.target.value, row, event: e})}
                                                
                                            />
                                            )}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {!row.isEdit ? (row.old) : (
                                                <TextField
                                                value={row?.old || ""}
                                                type="text"
                                                inputProps={{
                                                    name: 'age'
                                                }}
                                                onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> onChangeItem({row, value: e.target.value, event: e})}
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

export default TableList