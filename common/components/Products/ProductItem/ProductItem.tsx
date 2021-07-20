import ProductItemModel from "../../../../models/Products/ProductItemModel"
import styles from './ProductItem.module.css'
import React from "react";
interface Props {
    item: ProductItemModel;
    onItemClick: (item: ProductItemModel) => void,
    isSelected: boolean
}

const ProductItem: React.FC<Props> = (props: Props) => {

    const selectedStyle = props.isSelected ? {backgroundColor: 'lightyellow'} : {}

    return (
        <div onClick={() => props.onItemClick(props.item)} className={styles.productItemContainer} style={selectedStyle}>
            <div className={styles.productItemName}>{`${props.item.name} (${props.item.availableAmount})`}</div>
            <div className={styles.productItemPrice}>{props.item.price}</div>
        </div>
    )
}

export default ProductItem;
