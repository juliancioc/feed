import { FC } from "react";
import { Card, Editable, HStack, Stack, IconButton } from "@chakra-ui/react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

import { User } from "../user";

export type CommentProps = {
  postId: number;
  id: number;
  body: string;
};

export const Comments: FC<{
  comments: CommentProps[];
  handleRemoveComment: (id: number) => void;
}> = ({ comments, handleRemoveComment }) => {
  return (
    <Stack mt={4}>
      {comments.map((comment: CommentProps) => (
        <Card.Root key={comment.id} data-testid={`comment-${comment.id}`}>
          <HStack justifyContent="end">
            <IconButton
              variant="outline"
              size="xs"
              onClick={() => handleRemoveComment(comment.id)}
              margin={2}
            >
              <MdDelete color="red" />
            </IconButton>
          </HStack>
          <Card.Body>
            <User userId={2} />

            <Card.Description>
              <Editable.Root defaultValue={comment.body}>
                <Editable.Preview />
                <Editable.Textarea />

                <Editable.Control>
                  <Editable.EditTrigger>
                    <IconButton variant="ghost" size="xs">
                      <LuPencilLine />
                    </IconButton>
                  </Editable.EditTrigger>
                  <Editable.CancelTrigger>
                    <IconButton variant="outline" size="xs">
                      <LuX />
                    </IconButton>
                  </Editable.CancelTrigger>
                  <Editable.SubmitTrigger>
                    <IconButton variant="outline" size="xs">
                      <LuCheck />
                    </IconButton>
                  </Editable.SubmitTrigger>
                </Editable.Control>
              </Editable.Root>
            </Card.Description>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
};
