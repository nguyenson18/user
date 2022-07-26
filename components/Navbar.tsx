import MenuIcon from '@mui/icons-material/Menu'; ; 
import { Search } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Button, IconButton, TableCell, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react'
import { useRouter } from 'next/router';
import { LoginContext } from '../pages/contexts/loginContext';

function Navbar() {
    const router= useRouter()
    const {logout, userName}:any = useContext(LoginContext)
    
    
  return (
    <>
    <Box>
    <AppBar sx={{ background: '#242424' }}>
                <Toolbar>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton color="inherit" aria-label="open drawer"  edge="start" >
                                <MenuIcon />
                            </IconButton>
                            {/* <Search>   
                                    <SearchIcon />
                            </Search> */}
                        </Box>
                        <Box>
                            <Typography>
                                Welcom <span className="span-username">{userName}</span>
                                <Button className="logout"  onClick={() => {
                                logout(() => router.push("/login"));
                                }}>
                                    log out
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
        </AppBar>
    </Box>
    </>                 
  )
}

export default Navbar