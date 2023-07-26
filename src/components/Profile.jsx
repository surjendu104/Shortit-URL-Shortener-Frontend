import { Box, Button, Center, HStack, Link, Stack, Table, TableContainer, Td, Text, Th, Thead, Tr} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import Loader from './Loader'
import {useNavigate} from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedData = await axios.get(`${server}/user/get-user`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setUserData(fetchedData.data);
            setLoading(false);
        }
        fetchUserData();
    }, [])

    const handelLogOut = ()=> {
        if(localStorage.getItem("token") && localStorage.getItem("username")) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        }
        navigate('/')
    }


    return (
        <>
            {loading ? <Loader /> :
                <Box
                    h={"auto"}
                    w={"100%"}
                    m={"auto"}
                    mt={"1rem"}
                    bgColor={"blackAlpha.300"}
                    p={"1rem"}
                    borderRadius={"10px"}
                    display={{ md: "flex" }}
                    justifyContent={"Center"}
                    flexDirection={{ md: "column" }}
                    alignItems={{ md: "center" }}
                >
                    <Box>
                        <Stack>
                            <Text fontFamily={"sans-serif"} fontSize={"5rem"}>Hi, {userData.name}</Text>
                        </Stack>
                        <Stack
                            mb={"1rem"}
                            bgColor={'teal.700'}
                            p={"1rem"}
                            w={"fit-content"}
                            borderRadius={"2rem"}
                            color={"white"}
                        >
                            <Text fontSize={"1.5rem"} fontWeight={"20px"}>{userData.email}</Text>
                        </Stack>
                    </Box>
                    <Stack
                        bgColor={"blackAlpha.300"}
                        p={"1rem"}
                        borderRadius={"10px"}
                    >
                        <Stack
                            mb={"1rem"}
                            bgColor={'teal.700'}
                            p={"1rem"}
                            w={"fit-content"}
                            borderRadius={"2rem"}
                            color={"white"}
                            textAlign={"center"}
                        >
                            <Text fontSize={"1.5rem"} fontFamily={"roboto"}>Urls</Text>
                        </Stack>
                        <TableContainer>
                            <Table size={"md"}>
                                <Thead>
                                    <Tr fontSize={"200px"} >
                                        <Th fontSize={"1rem"}>Original Url</Th>
                                        <Th fontSize={"1rem"}>Short Url</Th>
                                        <Th fontSize={"1rem"}>Creation Date</Th>
                                        <Th fontSize={"1rem"}>Expiration Date</Th>
                                    </Tr>
                                </Thead>
                                {
                                    userData.urls.map((url) => (
                                        <Tr key={url.id}>
                                            <Td fontFamily={"Roboto Mono"} whiteSpace={{ md: "normal" }} maxW={{ md: "18rem" }} width={"auto"}>{url.originalUrl}</Td>
                                            <Td fontFamily={"Roboto Mono"}>{"https://shortit.org/"}{url.shortUrl}</Td>
                                            <Td fontFamily={"roboto"}>{new Date(`${url.creationDate}`).toLocaleDateString()} {new Date(`${url.creationDate}`).toLocaleTimeString()}</Td>
                                            <Td fontFamily={"roboto"}>{new Date(`${url.expirationDate}`).toLocaleDateString()} {new Date(`${url.expirationDate}`).toLocaleTimeString()}</Td>
                                        </Tr>
                                    ))
                                }
                            </Table>
                        </TableContainer>
                    </Stack>

                    <HStack>
                        <Button
                            bgColor={"teal.400"}
                            m={"2rem"}
                            onClick={handelLogOut}
                        >Log Out</Button>
                        <Button
                            bgColor={"teal.400"}
                            m={"2rem"}
                            onClick={()=>navigate('/')}
                        >
                            Home

                        </Button>
                    </HStack>
                </Box>
            }
        </>

    )
}

export default Profile