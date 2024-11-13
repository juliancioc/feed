import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Editable,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Header } from "src/components/header";
import axiosInstance from "src/services/api";
import { MdDelete } from "react-icons/md";
import { User } from "src/components/user";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Field } from "src/components/ui/field";
import generateId from "src/utils/generateId";
import { PostProps } from "../home";

const MyPosts = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostProps>();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const { data } = await axiosInstance.get(`/posts?userId=1`);

    setPosts(data);
  };

  const handleRemovepost = (postId: number) => {
    const removePost = posts.filter((post) => post.id !== postId);

    setPosts(removePost);
  };

  const onSubmit = handleSubmit((data) => {
    const { body, title } = data;

    const newPost = { body, title, userId: 1, id: generateId() };
    setPosts([newPost, ...posts]);
    reset();
  });

  return (
    <>
      <Header />

      <Container>
        <Stack maxW="4xl" margin="4rem auto">
          <Text textStyle="xl" mb="4">
            Meus posts
          </Text>

          <form onSubmit={onSubmit}>
            <Box
              p="4"
              borderWidth="1px"
              borderColor="border.disabled"
              color="fg.disabled"
              mb="6"
            >
              <Stack>
                <Text mb={2}>Adicionar novo post</Text>
                <Field
                  label="Título"
                  invalid={!!errors.title}
                  errorText={errors.title?.message}
                >
                  <Input
                    {...register("title", { required: "Título é obrigatório" })}
                  />
                </Field>

                <Field
                  label="Descrição"
                  invalid={!!errors.body}
                  errorText={errors.body?.message}
                >
                  <Input
                    {...register("body", {
                      required: "Descrição é obrigatório",
                    })}
                  />
                </Field>

                <Button type="submit" maxW="110px">
                  Adicionar
                </Button>
              </Stack>
            </Box>
          </form>

          {posts.map((post) => (
            <Card.Root key={post.id} mb="6">
              <HStack justifyContent="end">
                <IconButton
                  variant="outline"
                  size="xs"
                  onClick={() => handleRemovepost(post.id)}
                  margin={2}
                >
                  <MdDelete color="red" />
                </IconButton>
              </HStack>
              <Card.Body>
                <User userId={2} />

                <Card.Description asChild>
                  <Container>
                    <Editable.Root defaultValue={post.title}>
                      <Editable.Preview />
                      <Editable.Textarea />

                      <Editable.Control>
                        <Editable.EditTrigger asChild>
                          <IconButton variant="ghost" size="xs">
                            <LuPencilLine />
                          </IconButton>
                        </Editable.EditTrigger>
                        <Editable.CancelTrigger asChild>
                          <IconButton variant="outline" size="xs">
                            <LuX />
                          </IconButton>
                        </Editable.CancelTrigger>
                        <Editable.SubmitTrigger asChild>
                          <IconButton variant="outline" size="xs">
                            <LuCheck />
                          </IconButton>
                        </Editable.SubmitTrigger>
                      </Editable.Control>
                    </Editable.Root>

                    <Editable.Root defaultValue={post.body}>
                      <Editable.Preview />
                      <Editable.Textarea />

                      <Editable.Control>
                        <Editable.EditTrigger asChild>
                          <IconButton variant="ghost" size="xs">
                            <LuPencilLine />
                          </IconButton>
                        </Editable.EditTrigger>
                        <Editable.CancelTrigger asChild>
                          <IconButton variant="outline" size="xs">
                            <LuX />
                          </IconButton>
                        </Editable.CancelTrigger>
                        <Editable.SubmitTrigger asChild>
                          <IconButton variant="outline" size="xs">
                            <LuCheck />
                          </IconButton>
                        </Editable.SubmitTrigger>
                      </Editable.Control>
                    </Editable.Root>
                  </Container>
                </Card.Description>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default MyPosts