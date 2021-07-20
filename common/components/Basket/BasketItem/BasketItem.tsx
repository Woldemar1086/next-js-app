import ProductItemModel from "../../../../models/Products/ProductItemModel"
import styles from './BasketItem.module.css'
import React, {ChangeEvent} from "react";
import Button from "antd/lib/button";
import {convertPrice} from "../../../../utils/utils";

interface Props {
    item: ProductItemModel;
    onDeleteClick: (item: ProductItemModel) => void,
    onChangeAmount: (item: ProductItemModel) => void,
    dollarPrice: number,
    lastDollarPrice:  number
}

const BasketItem: React.FC<Props> = (props: Props) => {
    const { item, onChangeAmount, onDeleteClick, dollarPrice, lastDollarPrice} = props;

    const getStyles = () => {
        return dollarPrice > lastDollarPrice ? { color: 'red' } :
            dollarPrice < lastDollarPrice  ? { color: 'green' } : { color: 'grey' }
    }

    const setValueItem = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : undefined;
        onChangeAmount({...props.item, ordered: value})
    }

    return (
        <div className={styles.basketItemContainer}>
            <div className={styles.basketItemName}>{props.item.name}</div>

            <div className={styles.basketItemAmountContainer}>
                <input type='number' className={styles.basketItemAmount} min={1} onInput={setValueItem} value={item.ordered ? item.ordered : ''}/> шт.
                {props.item.ordered > item.availableAmount && <div className={styles.basketLimitNotification}>Количество ограничено</div>}
            </div>

            <div className={styles.basketItemPrice} style={getStyles()}>
                {item.ordered > 0 && <span>{convertPrice(item.price, dollarPrice).toFixed(2)} <span style={{color: 'grey'}}>руб./шт.</span></span>}
            </div>

            <div className={styles.basketItemDeleteButtonContainer}>
                <Button onClick={() => onDeleteClick(item)}>Удалить</Button>
            </div>
        </div>
    )
}

export default BasketItem;
