import NamesModel from "../models/Names/NamesModel";
import ProductResponseModel from "../models/Products/ProductResponseModel";
import ProductsTableGroupModel from "../models/Products/ProductsTableGroupModel";
import ProductItemModel from "../models/Products/ProductItemModel";

const prepareTableData = (products: ProductResponseModel[], names: NamesModel): ProductsTableGroupModel[] => {
    let data= {};
    let result = [];

    for(let i = 0, len = products.length; i < len; i++) {
        const groupName = names[products[i].G.toString()].G

        if(!data[products[i].G.toString()]){
            data[products[i].G.toString()] = {
                groupName: groupName,
                items: []
            }
        }

        data[products[i].G.toString()].items.push({
            name: names[products[i].G.toString()].B[products[i].T.toString()].N,
            availableAmount: products[i].P,
            price: products[i].C
        } as ProductItemModel)
    }

    for(let group in data){
        result.push(data[group])
    }

    return result;
}

const convertPrice = (price: number, currencyPrice: number): number => {
    return price * currencyPrice;
}

export {prepareTableData, convertPrice};
