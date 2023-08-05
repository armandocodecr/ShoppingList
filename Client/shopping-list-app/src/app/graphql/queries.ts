import { gql } from '@apollo/client';


//Auth
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

//Items
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

//Lists
export const getLists = gql`
query Lists {
  lists {
     completed
     name,
     id,
     creadtedAt,
     items {
       completed,
       quantity,
       item {
         name,
         category {
            name
         }
       }
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

export const updatedList = gql`
mutation Mutation($removeListId: ID!) {
  removeList(id: $removeListId) {
    id
  }
}
`

export const removedList = gql`
mutation Mutation($removeListId: ID!) {
  removeList(id: $removeListId) {
    id
  }
}
`

//ListItem
export const addListItem = gql`
mutation Mutation($createListItemInput: CreateListItemInput!) {
  createListItem(createListItemInput: $createListItemInput) {
    id
  }
}
`

export const getListItemByID = gql`
query Query($listId: ID!) {
  list(id: $listId) {
    completed
    id
    creadtedAt
    name,
    items {
      id
      completed,
      quantity,
      id,
      item {
        id, 
        name
        category {
          name
        }
      }
    }
  }
}
`

export const updatedListItem = gql`
mutation Mutation($updateListItemInput: UpdateListItemInput!) {
  updateListItem(updateListItemInput: $updateListItemInput) {
    id
    list {
      name,
      items {
        completed
      }
    }  
  }
}
`

//Categorys

export const addCategory = gql`
mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    id
  }
}
`

export const getAllCategorys = gql`
query Categories {
  categories {
    id,
    name
  }
}
`

