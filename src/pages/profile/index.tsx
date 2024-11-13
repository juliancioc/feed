import { Box, Button, Container, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Header } from "src/components/header";
import { Field } from "src/components/ui/field";

type ProfileProps = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
};

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileProps>({
    defaultValues: {
      name: "Leanne Graham",
      username: "Bret",
      id: 1,
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
      },
      phone: "55 11 91234-5678",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
      },
    },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <>
      <Header />
      <Container>
        <Stack maxW="lg" margin="4rem auto">
          <Text textStyle="xl" mb="4">
            Meu perfil
          </Text>
          <form onSubmit={onSubmit}>
            <Stack maxW="lg">
              <Box
                p="4"
                borderWidth="1px"
                borderColor="border.disabled"
                color="fg.disabled"
                mb="6"
              >
                <Text mb={2}>Usuário</Text>
                <Stack>
                  <Field
                    label="Nome"
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                  >
                    <Input
                      {...register("name", { required: "Nome é obrigatório" })}
                    />
                  </Field>
                  <Field
                    label="Nome de usuário"
                    invalid={!!errors.username}
                    errorText={errors.username?.message}
                  >
                    <Input
                      {...register("username", {
                        required: "Nome de usuário é obrigatório",
                      })}
                    />
                  </Field>
                  <Field
                    label="E-mail"
                    invalid={!!errors.email}
                    errorText={errors.email?.message}
                  >
                    <Input
                      {...register("email", {
                        required: "E-mail é obrigatório",
                      })}
                    />
                  </Field>
                </Stack>
              </Box>
              <Box
                p="4"
                borderWidth="1px"
                borderColor="border.disabled"
                color="fg.disabled"
                mb="6"
              >
                <Text mb={2}>Endereço</Text>
                <Stack>
                  <Field
                    label="Cidade"
                    invalid={!!errors.address?.city}
                    errorText={errors.address?.city?.message}
                  >
                    <Input
                      {...register("address.city", {
                        required: "Cidade é obrigatório",
                      })}
                    />
                  </Field>

                  <Field
                    label="Rua"
                    invalid={!!errors.address?.street}
                    errorText={errors.address?.street?.message}
                  >
                    <Input
                      {...register("address.street", {
                        required: "Rua é obrigatório",
                      })}
                    />
                  </Field>

                  <Field
                    label="Complemento"
                    invalid={!!errors.address?.suite}
                    errorText={errors.address?.suite?.message}
                  >
                    <Input {...register("address.suite")} />
                  </Field>

                  <Field
                    label="Cep"
                    invalid={!!errors.address?.zipcode}
                    errorText={errors.address?.zipcode?.message}
                  >
                    <Input
                      {...register("address.zipcode", {
                        required: "CEP é obrigatório",
                      })}
                    />
                  </Field>
                </Stack>
              </Box>

              <Box
                p="4"
                borderWidth="1px"
                borderColor="border.disabled"
                color="fg.disabled"
                mb="6"
              >
                <Text mb={2}>Empresa</Text>

                <Field
                  label="Nome"
                  invalid={!!errors.company?.name}
                  errorText={errors.company?.name?.message}
                >
                  <Input
                    {...register("company.name", {
                      required: "Nome da empresa é obrigatório",
                    })}
                  />
                </Field>
              </Box>
              <Button type="submit">Salvar</Button>
            </Stack>
          </form>
        </Stack>
      </Container>
    </>
  );
};

export default Profile;
