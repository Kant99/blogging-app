import React from 'react'
import { useState } from 'react';
import {Box, Typography, TextField, Button , styled} from '@mui/material'
import { API } from '../../service/api';

const Component=styled(Box)`
width:400px;
margin:auto;
box-shadow: 5px 2px 5px 2px rgba(0 0 0/ 0.6)
`;

const LoginButton=styled(Button)`
text-transform: none;
background:#FB641B;
color: #fff;
height:48px;
border-radius:2px;
margin-bottom:15px;
`
const SignupButton=styled(Button)`
text-transform: none;
background:#fff;
color: #2874f0;
height:48px;
border-radius:2px;
box-shadow:0 2px 4px 0 rgba(0 0 0/ 20%);
margin-bottom:15px;
`;

const Error= styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600;
`

const Text=styled(Typography)`
color: #878787;
font-size:16px;
`

const Image=styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0',
})

const Wrapper=styled(Box)`
margin: 25px 35px;
display:flex;
flex:1;
flex-direction: column;
& >div, &>button, &>p{
    margin-top:20px;
}
`
const signupInitialValues={
    name:"",
    username:"",
    password:""
}


const Login = () => {
    const [account,toggleAccount]= useState('login');
    const [signup,setSignup]=useState(signupInitialValues);
    const [error,setError]= useState('');

    const toggleSignup= ()=>{
       account==='signup'? toggleAccount('login'): toggleAccount('signup')
    }

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value})
    }
    const signupUser= async()=>{
        
            let response=await API.userSignup(signup);
            if(response && response.isSuccess){
             setError('')
             setSignup(signupInitialValues);
             toggleAccount('login')
            }else{
             setError('Something went wrong! Please Try Again Later ');
     
            }
        
      
    }
    

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
  return (
    <Component>
        <Box>
            <Image src={imageURL} alt="login" />
            {account ==='login' ?
            <Wrapper>
                <TextField  variant="standard" label="Enter Username "/>
                <TextField type="password" variant="standard"label="Enter Password" />
                
                {error && <Error>{error}</Error>}
                <LoginButton variant="contained">Login</LoginButton>
                <Text style={{textAlign:'center'}}>OR</Text>
                <SignupButton onClick={()=>toggleSignup()} >Create an account?</SignupButton>
                </Wrapper> 
                :
            <Wrapper>
                <TextField  variant="standard" onChange={e=>onInputChange(e)} name="name" label="Enter Name "/>
                <TextField  variant="standard" onChange={e=>onInputChange(e)} name="username" label="Enter Username "/>
                <TextField type="password" onChange={e=>onInputChange(e)} name="password" variant="standard"label="Enter Password" />
                
                {error && <Error>{error}</Error>}
                <SignupButton onClick={signupUser} >Signup</SignupButton>
                <Text style={{textAlign:'center'}}>OR</Text>
                <LoginButton variant="contained"  onClick={()=>toggleSignup()}>Already have an account?</LoginButton>
                </Wrapper>
                }
        </Box>
    </Component>
  )
}

export default Login
