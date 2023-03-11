import React from "react";
import { Button, Center, Flex, VStack } from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

function NavItem() {
  return (
    <VStack>
      <Flex justifyContent="space-between">
        <Button></Button>
        <label>Home</label>
      </Flex>
      <Flex boxShadow="base">
        <Center>
          <AiOutlineMenu />
          <label>Home</label>
        </Center>
      </Flex>
      <Flex justifyContent="space-between">
        <Button></Button>
        <label>Home</label>
      </Flex>
    </VStack>
  );
}

export default NavItem;
