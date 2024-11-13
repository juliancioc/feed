import { useEffect, useState } from "react";
import { Container, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Header } from "src/components/header";
import axiosInstance from "src/services/api";
import { PostProps } from "../home";
import { Post } from "src/components/post";

const UserPosts = () => {
  const { id } = useParams();

  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    getPosts();
  }, [id]);

  const getPosts = async () => {
    try {
      const { data } = await axiosInstance.get(`/posts?userId=${id}`);

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <Container>
        <Stack maxW="4xl" margin="4rem auto">
          <Text textStyle="xl" mb="4">
            Posts
          </Text>

          {posts.map((post) => (
            <Post post={post} key={post.id}/>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default UserPosts;
