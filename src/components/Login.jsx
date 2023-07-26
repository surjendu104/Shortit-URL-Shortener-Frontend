import { Box, Button, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../index';
import AlertComponent from './AlertComponent';
import Loader from './Loader';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({});
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLogInSuccess] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
      setLogInSuccess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, loginSuccess]);

  useEffect(() => {
    if (loginSuccess) {
      navigate('/');
    }
  }, [loginSuccess, navigate]);

  const saveLoginInfo = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
  }

  const handelSubmit = async () => {
    const data = {
      email: email,
      password: password,
    };
    setFormData(data);

    try {
      setLoading(true);
      const response = await axios.post(`${server}/auth/login`, data);
      setLoading(false);
      // The response data is not a string, continue with login success
      setResponseData(response.data);
      saveLoginInfo(response.data);
      console.log(response.data);
      console.log(response.status);
      setLogInSuccess(true);
    } catch (error) {
      setResponseData(error.response.data);
      setError(true);
      setLoading(false);
    }
  };

  if (error) return (
    <>
      <AlertComponent message={responseData.message} status={"error"} />
      <Login />
    </>
  )
  


  return (
    <>
      {loading ? <Loader /> :
        <Box
          maxW={"400px"}
          h={"20rem"}
          m={"auto"}
          mt={"8rem"}
          bgColor={"blackAlpha.300"}
          p={"10px"}
          borderRadius={"10px"}
        >
          <Stack
            p={"1rem"}
          >
            <FormLabel>Email</FormLabel>
            <Input
              bgColor={"blackAlpha.400"}
              placeholder='example@gmail.com'
              type='email'
              name='email'
              onChange={(event) => setEmail(event.target.value)}
            />
          </Stack>
          <Stack
            p={"1rem"}
          >
            <FormLabel>Password</FormLabel>
            <Input
              bgColor={"blackAlpha.400"}
              placeholder='Password'
              type='password'
              name='password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </Stack>
          <Stack
            w={"auto"}
            align={"center"}
          >
            <Button bgColor={"blue.300"}
              onClick={handelSubmit}
            >
              Log In
            </Button>
          </Stack>
        </Box>

      }
    </>

  )
}

export default Login