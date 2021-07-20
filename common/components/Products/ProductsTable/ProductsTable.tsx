import React, { useEffect, useState } from 'react';
import Collapse from 'antd/lib/collapse/Collapse';
import ProductsTableGroupModel from '../../../../models/Products/ProductsTableGroupModel';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductsTable.module.css'
import {prepareTableData} from '../../../../utils/utils';
import ProductItemModel from '../../../../models/Products/ProductItemModel';
const { Panel } = Collapse;

type Props = {
    onSelectItem: (item: ProductItemModel) => void,
    selectedItems: ProductItemModel[]
}

const ProductsTable: React.FC<Props> = (props: Props) => {
    const { onSelectItem, selectedItems } = props;
    const [tableData, setTableData] = useState<ProductsTableGroupModel[]>([]);

    useEffect(()=>{
        if(tableData?.length < 1){
            getData();
        }
        setInterval(getData, 15000)
    }, [])

    const getData = async () => {
        const products = await fetch('https://raw.githubusercontent.com/nakukop/test/main/products.json')
            .then(res => res.json())
        const names = await fetch('https://raw.githubusercontent.com/nakukop/test/main/names.json')
            .then(res => res.json())
        setTableData(prepareTableData(products.Value.Goods, names))
    }

    return (
        <>
            {tableData.map((table,i) =>
                <Collapse
                    defaultActiveKey={['1']}
                    expandIconPosition='left'
                    className={styles.tableProductsContainer}
                    key={`collapsed-product-table-${i}`}
                >
                    <Panel className={styles.tableProductsPanel} header={table.groupName} key="1">
                        {table.items?.map((product, i)=> {
                            const isSelected = selectedItems.findIndex(item=>product.name === item.name) !== -1;
                            return <ProductItem
                                        onItemClick={onSelectItem}
                                        key={`product-${product.price}-${i}`}
                                        item={product}
                                        isSelected={isSelected}
                                    />
                        })}
                    </Panel>
                </Collapse>
            )}
    </>)
}


export default ProductsTable;
