import { FC, useEffect, useState } from "react";
import { HStack, Stack, Text } from "@chakra-ui/react";

import { Avatar } from "src/components/ui/avatar";
import axiosInstance from "src/services/api";
import { Link } from "react-router-dom";

export type UserProps = {
  name: string;
  username: string;
  id: number;
};

export const User: FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<UserProps>({
    name: "",
    username: "",
    id: 0,
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await axiosInstance.get(`/users/${userId}`);

    setUser(data);
  };

  return (
    <HStack>
      <Avatar
        src="https://images.unsplash.com/photo-1511806754518-53bada35f930"
        name="Nate Foss"
      />
      <Stack gap="0">
        <Text fontWeight="semibold" textStyle="sm">
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </Text>
        <Text color="fg.muted" textStyle="sm">
          @{user.username.toLowerCase()}
        </Text>
      </Stack>
    </HStack>
  );
};
