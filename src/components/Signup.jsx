import { Box, Button, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../index';
import AlertComponent from './AlertComponent';
import Loader from './Loader';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({});
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignUpSuccess] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
      setSignUpSuccess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, signupSuccess]);

  useEffect(() => {
    if (signupSuccess) {
      navigate('/login'); // Redirect to "/" on success
    }
  }, [signupSuccess, navigate]);


  const handelSubmit = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    setFormData(data);

    try {
      setLoading(true);
      const response = await axios.post(`${server}/auth/signup`, data);
      // if(response.status === 400) console.log(response.data)
      setResponseData(response.data);
      setLoading(false);
      setSignUpSuccess(true);
    } catch (error) {
      setResponseData(error.response.data)
      setError(true);
      setLoading(false);
    }
  };

  // const handelRedirect = ()=> {
  //   naviagte("/", {replace:true});
  // }

  if (error) return (
    <>
      <AlertComponent message={responseData.message} status={"error"} />
      <Signup />
    </>
  )
  

  return (
    <>
      {loading ? <Loader /> :
        <Box
          maxW={"400px"}
          h={"25rem"}
          m={"auto"}
          mt={"8rem"}
          bgColor={"blackAlpha.300"}
          p={"10px"}
          borderRadius={"10px"}
        >
          <Stack
            p={"1rem"}
          >
            <FormLabel>Name</FormLabel>
            <Input
              bgColor={"blackAlpha.400"}
              placeholder='John Doe'
              type='text'
              name='name'
              onChange={(event) => setName(event.target.value)}
            />
          </Stack>
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
              Sign Up
            </Button>
          </Stack>
        </Box>

      }
    </>

  )
}

export default Signup