import ProductResponseModel from "./ProductResponseModel";

export default interface ProductsResponseModel {
    "Error": string,
    "Id": number,
    "Success": boolean,
    "Value":{
        "Goods": ProductResponseModel[]
    }
}
