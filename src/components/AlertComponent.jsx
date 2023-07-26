import { Alert, AlertIcon, HStack } from '@chakra-ui/react'
import React from 'react'

const AlertComponent = ({ message, status }) => {
    return (
      <HStack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Alert 
          status={status}
          position={"relative"} 
          w={"auto"}
        >
          <AlertIcon />
          {message}
        </Alert>

      </HStack>
    )
  }

export default AlertComponent;