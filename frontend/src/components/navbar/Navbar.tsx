import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { NavBarProps } from '../interfaces/appInterfaces';

function NavbarLogged({currentUser, setCurrentUserToNull}: NavBarProps){
    const navigate = useNavigate();

    const handleLogOut  = ()=>{
        setCurrentUserToNull();
        
        return navigate('/login');
    }
    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Link to='/'><Button   sx={{color:'white', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>Homepage</Button></Link>
            </Box>
            <Typography sx={{mr:2}}>Hi {currentUser?.user?.username}</Typography>
            <Link to='categories'><Button  sx={{color:'white', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>Categories</Button></Link>
            <Link to='operations'><Button  sx={{color:'white', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>Operations</Button></Link>
            <Button onClick={handleLogOut}   sx={{color:'white', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>Log out</Button>
        </>
    )
}

function NavbarWithoutLogin(){
    return(
        <>
            <Typography sx={{flexGrow: 1}}>Homepage</Typography>
            <Link to='login'><Button   sx={{color:'white', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>Login</Button></Link>
            <Link to='signup'><Button   sx={{color:'white', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>SignUp</Button></Link>
        </>
    )
}

function Navbar({currentUser, setCurrentUserToNull}: NavBarProps) {
  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor: '#b55b59'}}>
        <Toolbar>
             {currentUser?.token !== null ? (<NavbarLogged currentUser={currentUser} setCurrentUserToNull={setCurrentUserToNull}/>) : (<NavbarWithoutLogin/>) }
        </Toolbar>
      </AppBar>
    </Box>
  )
}



export default Navbar