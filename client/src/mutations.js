import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
