import React from "react";
import { Avatar, Button, Flex, Stack } from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import NavItem from "./navItem";

function SidebarMenu() {
  return (
    <Flex
      h="100vh"
      w="15rem"
      bg="gray.50"
      border="1px"
      borderColor="gray.200"
      direction="column"
    >
      <Flex alignContent="center" justifyContent="space-between" p="3">
        <Stack direction="row">
          <Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
        </Stack>
        <Button colorScheme="gray.50">
          <AiOutlineMenu color="black" />
        </Button>
      </Flex>
      <NavItem />
    </Flex>
  );
}

export default SidebarMenu;
