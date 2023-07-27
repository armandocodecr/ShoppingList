import { gql } from '@apollo/client';

export const signup = gql`
mutation Signup($signupInput: SignUpInput!) {
    signup(signupInput: $signupInput) {
      token
    }
  }
`

export const signin = gql`
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    token
  }
}
`

export const getLists = gql`
query Lists {
    lists {
      name,
      totalItems,
      items {
        completed,
        quantity,
        item {
          name
        }
      }  
    }
  }
`

export const getItems = gql`
query Items {
  items {
    id,
    name,
    category {
      name
    }
  }
}
`

export const addList = gql`
mutation Mutation($createListInput: CreateListInput!) {
  createList(createListInput: $createListInput) {
    id
  }
}
`

export const addListItem = gql`
mutation Mutation($createListItemInput: CreateListItemInput!) {
  createListItem(createListItemInput: $createListItemInput) {
    id
  }
}
`

export const getAllCategorys = gql`
query Query {
  categories {
    id,
    name
  }
}
`

export const addItem = gql`
mutation CreateItem($createItemInput: CreateItemInput!) {
  createItem(createItemInput: $createItemInput) {
    id
  }
}
`

export const removeItem = gql`
mutation RemoveItem($removeItemId: ID!) {
  removeItem(id: $removeItemId) {
    id
  }
}
`