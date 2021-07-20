import React, {useEffect, useRef, useState} from 'react'
import BasketTable from '../common/components/Basket/BasketTable/BasketTable'
import ProductsTable from '../common/components/Products/ProductsTable/ProductsTable'
import ProductItemModel from '../models/Products/ProductItemModel'
import styles from '../styles/Home.module.css'
import Modal from "antd/lib/modal/Modal";


const Main = () => {
    const [selectedItems, setSelectedItems] =  useState<ProductItemModel[]>([])
    const [isModalVisible, setIsModalVisible] =  useState<boolean>(false);

    const isBrowser = (): boolean => typeof window !== "undefined";

    const saveSelectedItems = (items: ProductItemModel[]) => {
        setSelectedItems(items)
        localStorage.setItem('basketState', JSON.stringify(items))
    }

    useEffect(()=> {
        if(isBrowser()) {
            setSelectedItems(JSON.parse(localStorage.getItem('basketState')))
            const modalState = JSON.parse(localStorage.getItem('modalState'))
            if(!modalState?.closed){
                setIsModalVisible(true)
            }
        }
    }, [])

    const closeModal = () => {
        localStorage.setItem('modalState', JSON.stringify({closed: true}))
        setIsModalVisible(false)
    }

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
          <Modal title="Комментарии от разработчика" visible={isModalVisible} onOk={()=> closeModal()} onCancel={()=> closeModal()}>
              <p>Как вы могли заметить в моем резюме, до этого момента я не имел опыта работы с Next.js, но могу сказать, что за эти 4 дня порядком разобрался со всем основным функционалом, от роутинга, до апи.<br/>
                  <br/>
                  Приступая к работе я попробовал реализовать классический подход с <b>react, redux</b>, но на форуме разработчиков Next.js, посоветовали мне не спрашивать про redux, так как буду отправлен с экзотическое пешее турне :)
                  Основная часть разработчиков работает с <b>MobX</b>.
              </p>
              <p> Ранее я также не сталкивался с надобностью хранить состояние локально, поэтому начал искать возможности. Первым попался redux-persist, и на разбор данной технологии и попытку внедрить его ушло полдня, а то и больше.
                  В конечном итоге было принято решение пойти самым простым путем и использовать localstorage. Хотя сейчас, прочитав многое в процессе разработки про различные варианты хранилища, понимаю что для проектов в целов, лучше будет indexDB.
              </p>
              <p>В части реализации запроса к данным, тут можно было бы реализовать и через getStaticProps, но для подгрузки каждые 15 секунд он не подходит.
                  Изучив документацию я не нашел сколько бы то ни было хорошей реализации ни websocket ни SSE.
                  Везде было указано, что такую реализацию необходимо разделять по классической схеме, client-server и пушить изменения с применением cron schedulers(что я сам делал уже не раз).
              </p>
              <p>P.S. ошибка в консоли для модалки связана с тем, что andt не может пока поправить работу в StrictMode. Решаемо, но для сообщения в тестовом не критично. Безусловно, в проде таких вещей не должно быть.
              Спасибо! И надеюсь на фитбек по выполненой работе.</p>
          </Modal>
      </main>
    </div>
    )
}

export default Main;
