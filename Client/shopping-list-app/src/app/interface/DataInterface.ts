

export interface IDataFromServer {
    ok       : boolean;
    data     : any
}

export interface IDataItems{
  id: string
  category   : Category
  name       : string
  __typename?: string
}

export interface IPropertyItems {
  category   : string
  items      : IArrayItems[]
}

export interface IArrayItems{
  id         : string;
  name       : string;
  quantity   : number
}
  
export interface Category {
  name       : string
  __typename : string
}

export interface IAccItems{
  [key: string]: IArrayItems[]
}

export interface IDataError {
  ok         : boolean;
  message    : string
}