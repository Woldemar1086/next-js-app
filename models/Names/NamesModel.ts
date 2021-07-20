export default interface NamesModel {
    [key: string]: NameGroupModel
}

interface NameGroupModel {
    "G": string;
    "C"?: number;
    "B": NamesGoodsModel
}

interface NamesGoodsModel {
    [key: string]: {
        "N": string;
        "T": number;
    }
}
