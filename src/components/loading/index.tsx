import { Text, Spinner, VStack } from "@chakra-ui/react";

const Loading = () => {
  return (
    <VStack height="100vh" justifyContent="center">
      <Spinner size="xl" />
      <Text color="colorPalette.600">Carregando...</Text>
    </VStack>
  );
};

export default Loading;
