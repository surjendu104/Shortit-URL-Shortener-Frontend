import { Box, Button, Input, HStack, Text, VStack, TableContainer, Table, Thead, Tr, Th, Td } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { server } from '../index';
import Loader from './Loader';
import { BsArrowUpRightCircle } from 'react-icons/bs'
import {Link} from 'react-router-dom';

const Home = () => {
  const [longurl, setLongUrl] = useState("");
  const [shorturl, setShortUrl] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handelSubmit = async () => {
    const data = {
      originalUrl: longurl
    }
    try {
      setLoading(true);
      const fetchShortUrl = await axios.post(`${server}/home/saveurl`, data, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setLoading(false);
      setShortUrl(fetchShortUrl.data);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  }

  // const 

  return (
    <>{
      loading ? <Loader /> :
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={"12rem"}
        >
          <VStack>
            <HStack
            >

              <Input
                type='text' name='url'
                placeholder='Enter url to short'
                borderColor={"black"}
                borderWidth={"2px"}
                onChange={(event) => setLongUrl(event.target.value)}
              />
              <Button bgColor={"teal.900"} color={"white"} onClick={handelSubmit}>GO</Button>
            </HStack>

            {/* {
              success ? (<HStack>
                <Text
                  bgColor={'yellow'}
                  p={"0.5rem"}
                  w={"fit-content"}
                  borderRadius={"10px"}
                  fontFamily={"roboto"}
                  fontSize={"1rem"}
                >
                  {"https://shortit.org/"}{shorturl.shortUrl}
                </Text>
                <Button m={"1rem"}><BsArrowUpRightCircle /></Button>
              </HStack>) : <></>
            } */}
            {
              success ?
                <Box
                  bgColor={"blackAlpha.300"}
                  m={"2rem"}
                  borderRadius={"10px"}
                  // w={"75%"}
                >
                  <TableContainer>
                    <Table size={"md"}>
                      <Thead>
                        <Tr fontSize={"200px"} >
                          <Th fontSize={"1rem"}>Original Url</Th>
                          <Th fontSize={"1rem"}>Short Url</Th>
                          <Th fontSize={"1rem"}>Creation Date</Th>
                          <Th fontSize={"1rem"}>Expiration Date</Th>
                          <Th fontSize={"1rem"}>Link</Th>
                        </Tr>
                      </Thead>
                      <Tr key={shorturl.id}>
                        <Td fontFamily={"Roboto Mono"} whiteSpace={{ md: "normal" }} maxW={{ md: "18rem" }} width={"auto"}>{shorturl.originalUrl}</Td>
                        <Td fontFamily={"Roboto Mono"}>{"https://shortit.org/"}{shorturl.shortUrl}</Td>
                        <Td fontFamily={"roboto"}>{new Date(`${shorturl.creationDate}`).toLocaleDateString()} {new Date(`${shorturl.creationDate}`).toLocaleTimeString()}</Td>
                        <Td fontFamily={"roboto"}>{new Date(`${shorturl.expirationDate}`).toLocaleDateString()} {new Date(`${shorturl.expirationDate}`).toLocaleTimeString()}</Td>
                        <Td fontFamily={"roboto"}><Link to={`http://localhost:8080/home/${shorturl.shortUrl}`}><BsArrowUpRightCircle /></Link></Td>
                      </Tr>
                    </Table>
                  </TableContainer>
                </Box> : <></>
            }

          </VStack>
        </Box>
    }
    </>
  )
}

export default Home