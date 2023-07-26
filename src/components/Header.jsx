import { Button, HStack, Heading, Switch, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPersonOutline } from 'react-icons/md';
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";

    const handelProfileClick = ()=> {
        if(localStorage.getItem("token") != null) navigate('/profile');
        else navigate('/login');
    }

    return (
        <HStack
            m={"2"}
            p={"2"}
            bgColor={"blackAlpha.100"}
            display={"flex"}
            justifyContent={"space-between"}
            borderRadius={"20px"}
            borderColor={"blackAlpha.500"}
            borderWidth={"2px"}
        >
            <Link to='/'><Heading padding={"2"} fontSize={"3xl"}>Short It</Heading></Link>
            <HStack
                marginRight={"4"}
            >
                <Button bgColor={"teal.400"}>
                    <Link to='/login'>Login</Link>
                </Button>
                <Button
                    bgColor={"teal.400"}
                >
                    <Link to='/signup'>Signup</Link>
                </Button>
                <Button onClick={handelProfileClick}>
                    <MdPersonOutline size={"2rem"} />
                </Button>
                <Switch
                    isChecked={isDark}
                    onChange={toggleColorMode}
                />
            </HStack>
        </HStack>
    )
}


export default Header