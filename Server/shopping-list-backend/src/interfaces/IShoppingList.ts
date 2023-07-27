
type itemsData = {

    name: string;
    quantity: number

}

export interface IShoppingList {

    name: string;
    items: [itemsData];
    completed: boolean
}