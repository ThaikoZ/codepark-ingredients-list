import Form from "./expense-tracker/components/Form";
import Table from "./expense-tracker/components/Table";
import Tracker from "./expense-tracker/components/Tracker";
import { useState, useEffect } from "react";
import ItemsService, { Item } from "./services/items-service";
import UsersService from "./services/users-service";
import "./app.css";

export const categories = ["Groceries", "Utilities", "Entertainment"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [itemList, setItemList] = useState<Item[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Session authentication
    // token is in a local storage at key 'session_token'
    // UsersService.authenticateUser();
    fetchItems();
  }, []);

  const visibleItems = selectedCategory
    ? itemList.filter((item) => item.category === selectedCategory)
    : itemList;

  const fetchItems = () => {
    setLoading(true);
    const { request, cancel } = ItemsService.getAllItems();
    request
      .then((response) => {
        setItemList(response.data);
        setLastId(response.data[response.data.length - 1].id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => cancel();
  };

  const addItem = (item: Item) => {
    setItemList([item, ...itemList]);

    const { request, cancel } = ItemsService.addItem(item);
    request.catch((err) => console.log(err));
    return () => cancel();
  };
  const deleteItem = (item_id: number) => {
    setItemList(itemList.filter((item) => item.id !== item_id));

    const { request, cancel } = ItemsService.deleteItem(item_id);
    request.catch((err) => console.log(err));
    return () => cancel();
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="submit__form">
        <Form
          onUpdate={(obj) =>
            addItem({
              id: lastId + 1,
              description: obj.description,
              amount: obj.amount,
              category: obj.category,
            })
          }
          categories={categories}
        />
        <Tracker
          onSelectCategory={(category) => {
            setSelectedCategory(category);
          }}
        />
        {isLoading && (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border "></div>
          </div>
        )}
        <Table
          itemList={visibleItems}
          onDelete={(id) => {
            console.log(id);
            deleteItem(id);
          }}
        />
      </div>
    </div>
  );
}

export default App;
