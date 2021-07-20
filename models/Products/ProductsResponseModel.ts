import ProductResponseModel from "./ProductResponseModel";

export default interface ProductsResponseModel {
    "Error":"",
    "Id":0,
    "Success":true,
    "Value":{
        "Goods": ProductResponseModel[]
    }
}
