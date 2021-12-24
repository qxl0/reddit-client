import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from "next/link";

const ChangePassword: NextPage<{token: string}> = ({token}) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [ tokenError, setTokenError ] = useState(false);
  return (
    <Wrapper variant="small">
      <Formik initialValues={{ newPassword: '' }}
        onSubmit={async (values, {setErrors}) => {
          const response=await changePassword({
            token,
            newPassword: values.newPassword
          });
          console.log("changePassword response: ", response);
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(true);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked!!!
            router.push("/");
          }
        }} 
        >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="newPassword" placeholder="new password" label="New Password" type="password"/>
            {tokenError ? (
            <Flex> <Box mr={2} style={{color: "red"}}>{tokenError}</Box>
              <NextLink href="/forgotPassword">
                <Link>Click here to reset your password</Link>
              </NextLink>
            </Flex>): null}
            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
      </Wrapper>
  )
}

ChangePassword.getInitialProps = async ({query}) => {
  return { token: query.token as string}
}
export default withUrqlClient(createUrqlClient)(ChangePassword);