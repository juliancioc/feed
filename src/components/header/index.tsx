import {
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import { MdOutlineExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";

import { User } from "../user";
import logo from "../../assets/logo.png";

export const Header = () => {
  return (
    <Container>
      <Flex justifyContent="space-between" alignContent="center" margin={4}>
        <Link to="/">
          <Image
            src={logo}
            boxSize="60px"
            borderRadius="full"
            fit="cover"
            alt="Feed dev"
          />
        </Link>

        <HStack>
          <User userId={1} />
          <MenuRoot>
            <MenuTrigger asChild>
              <IconButton variant="outline">
                <MdOutlineExpandMore />
              </IconButton>
            </MenuTrigger>
            <MenuContent position="absolute" top="50px" right="10px">
              <MenuItem value="home">
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem value="my-posts">
                <Link to="/my-posts">Meus posts</Link>
              </MenuItem>
              <MenuItem value="profile">
                <Link to="/profile">Perfil</Link>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </HStack>
      </Flex>
    </Container>
  );
};
