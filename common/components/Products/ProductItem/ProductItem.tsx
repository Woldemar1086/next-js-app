import ProductItemModel from "../../../../models/Products/ProductItemModel"
import styles from './ProductItem.module.css'
interface Props {
    item: ProductItemModel;
    onItemClick: (item: ProductItemModel) => void
}

const ProductItem: React.FC<Props> = (props: Props) => {
    return (
        <div onClick={() => props.onItemClick(props.item)} className={styles.productItemContainer}>
            <div className={styles.productItemName}>{`${props.item.name} (${props.item.availableAmount})`}</div>
            <div className={styles.productItemPrice}>{props.item.price}</div>
        </div>
    )
}

export default ProductItem;
