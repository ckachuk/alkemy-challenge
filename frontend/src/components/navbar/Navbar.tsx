import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

interface IProps{
    currentUser:{
        token: string | null,
        user: {
            username: string
        } | null
    } | null,
    setCurrentUserToNull: () => void
}


function NavbarLogged({currentUser, setCurrentUserToNull}: IProps){
    const navigate = useNavigate();

    const handleLogOut  = ()=>{
        setCurrentUserToNull();
        
        return navigate('/login');
    }
    return(
        <>
            <Button onClick={handleLogOut}  sx={{color:'white'}}>Log out</Button>
            <Link to='categories'><Button  sx={{color:'white'}}>Categories</Button></Link>
            <Typography>Hi {currentUser?.user?.username}</Typography>
        </>
    )
}

function NavbarWithoutLogin(){
    return(
        <>
            <Link to='login'><Button  sx={{color:'white'}}>Login</Button></Link>
            <Link to='signup'><Button  sx={{color:'white'}}>SignUp</Button></Link>
        </>
    )
}

function Navbar({currentUser, setCurrentUserToNull}: IProps) {
  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
            <Typography sx={{flexGrow: 1}}>Homepage</Typography>
             {currentUser?.token !== null ? (<NavbarLogged currentUser={currentUser} setCurrentUserToNull={setCurrentUserToNull}/>) : (<NavbarWithoutLogin/>) }
        </Toolbar>
      </AppBar>
    </Box>
  )
}



export default Navbar