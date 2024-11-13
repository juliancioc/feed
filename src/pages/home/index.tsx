import { Container, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Header } from "src/components/header";
import { Post } from "src/components/post";
import axiosInstance from "src/services/api";

export type PostProps = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const { data } = await axiosInstance.get("/posts");

    setPosts(data);
  };

  return (
    <>
      <Header />

      <Container>
        <Stack maxW="4xl" margin="4rem auto">
          <Text textStyle="xl" mb="4">
            Feed
          </Text>

          {posts.map((post: PostProps) => (
            <Post post={post} key={post.id} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
