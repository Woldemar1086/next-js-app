import React from "react";
import styles from './BasketHeader.module.css'

export const BasketHeader = () => {
    return (
        <div className={styles.basketHeaderContainer}>
            <div className={styles.basketHeaderName}>
                Наименование товара и описание
            </div>
            <div className={styles.basketAmountContainer}>
                Количество
            </div>
            <div className={styles.basketHeaderPrice}>
                Цена
            </div>
            <div className={styles.basketDeleteButtonContainer}/>
        </div>
    )
}
