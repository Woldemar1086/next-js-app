import React, {useEffect, useState} from 'react'
import BasketTable from '../common/components/Basket/BasketTable/BasketTable'
import ProductsTable from '../common/components/Products/ProductsTable/ProductsTable'
import ProductItemModel from '../models/Products/ProductItemModel'
import styles from '../styles/Home.module.css'


const Main = () => {
    const [selectedItems, setSelectedItems] =  useState<ProductItemModel[]>([])

    const isBrowser = (): boolean => typeof window !== "undefined";

    const saveSelectedItems = (items: ProductItemModel[]) => {
        setSelectedItems(items)
        localStorage.setItem('basketState', JSON.stringify(items))
    }

    useEffect(()=> {
        if(isBrowser()) {
            setSelectedItems(JSON.parse(localStorage.getItem('basketState')))
        }
    }, [])

    const onSelectItem = (item: ProductItemModel) => {
        const items = selectedItems.map(item=> ({...item}))
        if(!items.find(selectedItem => selectedItem.name === item.name)) {
            items.push({...item, ordered: 1})
        }
        saveSelectedItems(items)
    }

    const onChangeAmount = (item) => {
        const update = selectedItems.map(selectedItem => {
            if(selectedItem.name === item.name){
                return item
            }
            return selectedItem
        })
        saveSelectedItems(update)
    }

    const onDeleteItem = (item: ProductItemModel) => {
        let items = selectedItems.map(item=> ({...item}))
        const index = items.findIndex(selectedItem=>item.name === selectedItem.name);
        items.splice(index, 1)

        saveSelectedItems(items)
    }

    return (
    <div className={styles.container}>
      <main className={styles.main}>
          <div className={styles.tablesContainer}>
              <ProductsTable onSelectItem={onSelectItem} selectedItems={selectedItems}/>
          </div>

          <div className={styles.tablesContainer}>
              <BasketTable onDeleteClick={onDeleteItem} onChangeAmount={onChangeAmount} selectedItems={selectedItems}/>
          </div>
      </main>
    </div>
    )
}

export default Main;
