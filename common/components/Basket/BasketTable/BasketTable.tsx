import React, { useEffect, useState } from 'react';
import styles from './BasketTable.module.css'
import ProductItemModel from '../../../../models/Products/ProductItemModel';
import BasketItem from '../BasketItem/BasketItem';
import {BasketHeader} from "../BasketHeader/BasketHeader";
import {convertPrice} from "../../../../utils/utils";

type Props = {
    selectedItems: ProductItemModel[],
    onDeleteClick: (item: ProductItemModel) => void,
    onChangeAmount: (item: ProductItemModel) => void
}

const BasketTable: React.FC<Props> = (props: Props) => {
    const { selectedItems, onDeleteClick, onChangeAmount } = props;
    const [dollarPrice, setDollarPrice] = useState<number>(50);
    const [totalPrice, setTotalPrice] = useState<number>(50);
    const [prices, setPrices] = useState({lastPrice: 0, currentPrice: 0});

    useEffect(()=>{
        setInterval(getDollarPrice, 20000)
    }, [])

    useEffect(()=> {
        setLastDollarPrice(dollarPrice, prices.currentPrice)
        setTotalPrice(getTotalPrice(selectedItems, dollarPrice));
    }, [selectedItems, dollarPrice])

    const setLastDollarPrice = (currentPrice, lastPrice) => {
        setPrices({currentPrice, lastPrice})
    }

    const priceStyles = prices.currentPrice > prices.lastPrice ? { color: 'red' } :
        prices.currentPrice < prices.lastPrice  ? { color: 'green' } : { color: 'grey' }

    const getDollarPrice = () =>{
        setDollarPrice(Math.floor(Math.random() * (80 - 50 + 1) + 50));
    }

    const getTotalPrice = (selectedItems: ProductItemModel[], currencyPrice: number) => {
        let totalPrice = 0;
        selectedItems.forEach(item=> {
            const productTotalPrice = item.ordered ? item.ordered*item.price : 0;
            totalPrice += productTotalPrice
        })

        return convertPrice(totalPrice, currencyPrice)
    }

    return (
        <div className={styles.basketTableContainer}>
            <BasketHeader/>
            {selectedItems.map((product,i) =>
                <BasketItem
                    key={`basket-item-product-${product.price}-${i}`}
                    onChangeAmount={onChangeAmount}
                    onDeleteClick={onDeleteClick}
                    item={product}
                    dollarPrice={dollarPrice}
                    lastDollarPrice={prices.lastPrice}
                />
            )}
            <div className={styles.basketTableTotalPriceContainer}>
                <div className={styles.basketTableTotalPrice}>
                    <span className={styles.basketTableTotalPriceInfo}>Общая стоимость:</span>
                    <span className={styles.basketTableTotalPriceValue} style={priceStyles}>{totalPrice.toFixed(2)} руб.</span>
                </div>
            </div>
        </div>)
}


export default BasketTable;
