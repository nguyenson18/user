import React, { useContext, useState } from 'react'
import {  useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Container } from '@mui/system';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {Link as RouterLink} from '@mui/material'
import { AuthContext } from './contexts/AuthContext';
import { FormProvider, FormTextField } from './form';
import { LoginContext } from './contexts/loginContext';



const LoginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.number().required("Password is required")
  });
  const defaultValues = {
    username: "",
    password:""
  };
function Login() {
  const [showPassword, setShowPassword] = useState(false)
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });
  const { handleSubmit } = methods;
  const router= useRouter()
  const {login,  loginErrors,setUserName} = useContext(LoginContext)
  const onSubmit = (data:any) => {
    let{username, password} = data
    const getUsername:any = localStorage.getItem("username")
    const getPassword: any = localStorage.getItem("password")
    setUserName(getUsername)
    if(username == getUsername && password == getPassword ){
      login({username, password}, ()=> {
        router.push("/students")
      })
    }else{
      loginErrors( ()=> {
        router.push("/login")
      })
    }
  };

  return (
    <Box sx={{textAlign:"center", marginTop:"100px"}}>
      <picture>
        <img src='/favicon.ico' width="50" alt=''/> 
      </picture>   
    <Container maxWidth="xs" sx={{marginTop: "50px",}}>   
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: { md: "100%", xs: "200px" }, }}>
      
        <Alert severity="info">
          Don’t have an account?{" "}
          <Link  href="/register">
            <RouterLink sx={{cursor:"pointer"}}>
                Get started
            </RouterLink>
          </Link>
        </Alert>
        <FormTextField name="username" label="Username" />
        <FormTextField
         name="password" 
         label="Password" 
         type= {showPassword ? "text" : "password"}
          InputProps={{
          endAdornment:(
            <InputAdornment position="end">
              <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)} 
              onMouseDown={(e)=> e.preventDefault()}
              edge="end"
              >
                {showPassword ? <Visibility/> : <VisibilityOff/>}
              </IconButton>
            </InputAdornment>
          )
        }}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </FormProvider>
    </Container>
    </Box>
  )
}

export default Login