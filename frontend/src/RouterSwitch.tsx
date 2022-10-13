import React from 'react';
import './App.css';
import Signup from './components/authentications/Signup';
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from './components/authentications/Login';
import Operations from './components/operations/Operations';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from './components/navbar/Navbar';
import Categories from './components/categories/Categories';
import CategoryOperations from './components/categories/CategoryOperations';
import OperationForm from './components/operations/OperationForm';

const queryClient = new QueryClient()


interface CurrentUser{
  user: {
    username:string
  } | null,
  token: string | null,
}

interface ProtectedRouteProps{
  currentUser: CurrentUser,
  children: JSX.Element | JSX.Element[],
  setCurrentUserToNull: () => void
}

const ProtectedRoute = ( {currentUser, children, setCurrentUserToNull}: ProtectedRouteProps ) => {
  let decodedToken: any = currentUser.token !== null ? jwt_decode(currentUser.token!): null;
  let currentDate = new Date();

  if(decodedToken === null){
    return <Navigate replace to="/login"/>
  }
  else if (decodedToken.exp * 1000 < currentDate.getTime()) {
      setCurrentUserToNull();
  
      return <Navigate replace to="/login"/>
  }
 

  return (<>
    {children}
  </>
);
};




function RouterSwitch() {

  const [currentUser, setCurrentUser] = React.useState<CurrentUser>({
    user: JSON.parse(localStorage.getItem('user')!),
    token: localStorage.getItem('token')!
  })
  
  const setCurrentUserToNull = ()=>{
    setCurrentUser({
      user: null,
      token: null
    })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }  
  return (
    <Box>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Navbar currentUser={currentUser} setCurrentUserToNull={setCurrentUserToNull}/>
                    <Routes>  
                        <Route path="login" element={currentUser.token !== null? (<Navigate to="/operations" replace />): (<Login/>)}/>
                        <Route path="signup" element={currentUser.token !== null? (<Navigate to="/operations" replace />): (<Signup/>)}/>
                        <Route path="operations" element={
                        <ProtectedRoute currentUser={currentUser} setCurrentUserToNull={setCurrentUserToNull}>
                            <Operations />
                        </ProtectedRoute>
                        }/>
                        <Route path="operations/:operationId" element={
                        <ProtectedRoute currentUser={currentUser} setCurrentUserToNull={setCurrentUserToNull}>
                            <OperationForm />
                        </ProtectedRoute>
                        }/>
                        <Route path="operation" element={
                        <ProtectedRoute currentUser={currentUser} setCurrentUserToNull={setCurrentUserToNull}>
                            <OperationForm />
                        </ProtectedRoute>
                        }/>
                        <Route path="categories" element={
                        <ProtectedRoute currentUser={currentUser} setCurrentUserToNull={setCurrentUserToNull}>
                            <Categories/>
                        </ProtectedRoute>
                        }/>
                        <Route path="categories/:categoryId" element={
                        <ProtectedRoute currentUser={currentUser} setCurrentUserToNull={setCurrentUserToNull}>
                            <CategoryOperations/>
                        </ProtectedRoute>
                        }/>
                        <Route path="*" element={<Navigate replace to="/login"/>}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Box>  
  );
}

export default RouterSwitch;
