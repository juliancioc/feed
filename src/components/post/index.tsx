import { FC, FormEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { LiaCommentSolid } from "react-icons/lia";
import { IoSend } from "react-icons/io5";

import { User } from "../user";
import axiosInstance from "src/services/api";
import { CommentProps, Comments } from "../comments";
import generateId from "src/utils/generateId";
import { PostProps } from "src/pages/home";

export const Post: FC<{ post: PostProps }> = ({ post }) => {
  const { title, body, userId, id } = post;

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [viewComments, setViewComments] = useState<CommentProps[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const { data } = await axiosInstance.get(`/posts/${id}/comments`);

    setComments(data);
  };

  const handleViewComments = () => {
    setViewComments(comments);
  };

  const handleAddNewComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      postId: id,
      id: generateId(),
      name: "",
      email: "",
      body: comment,
    };

    setComment("");
    setComments([newComment, ...comments]);
    setViewComments([newComment, ...viewComments]);
  };

  const handleRemoveComment = (id: number) => {
    const removeComment = comments.filter((c) => c.id !== id);

    setComments(removeComment);
    setViewComments(removeComment);
  };

  return (
    <Card.Root maxW="3xl" margin="3">
      <Card.Body>
        <User userId={userId} />

        <Card.Title>{title}</Card.Title>

        <Card.Description fontSize="16px">{body}</Card.Description>

        <Card.Footer>
          <HStack mt={4}>
            <Button variant="ghost" onClick={handleViewComments}>
              <LiaCommentSolid size={24} />
              {comments.length > 0 && <Text>{comments.length}</Text>}
            </Button>
          </HStack>
        </Card.Footer>

        <HStack mb={2}>
          <form
            onSubmit={handleAddNewComment}
            style={{ display: "flex", width: "100%" }}
          >
            <Input
              placeholder="Novo comentário"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <IconButton type="submit" variant="outline" ml={2} data-testid="btn-add-new-comment">
              <IoSend />
            </IconButton>
          </form>
        </HStack>

        {viewComments.length > 0 && (
          <>
            <Text>Todos comentários</Text>
            <Comments
              comments={viewComments}
              handleRemoveComment={(id) => handleRemoveComment(id)}
            />
          </>
        )}
      </Card.Body>
    </Card.Root>
  );
};
