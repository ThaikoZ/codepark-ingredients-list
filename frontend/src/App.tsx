import Form from "./expense-tracker/components/Form";
import Table from "./expense-tracker/components/Table";
import Tracker from "./expense-tracker/components/Tracker";
import { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";

export const categories = ["Groceries", "Utilities", "Entertainment"];

interface Item {
  id: number
  description: string
  amount: number
  category: string
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [itemList, setItemList] = useState<Item[]>([]);
  const [lastId, setLastId] = useState<number>(0);

  useEffect(() => {
    fetchItems();
  }, [])

  const visibleItems = selectedCategory
    ? itemList.filter((item) => item.category === selectedCategory)
    : itemList;

  const fetchItems = () => {
    axios
      .get("http://127.0.0.1:8000/api/items")
      .then((response) => {
        setItemList(response.data); 
        setLastId(response.data[response.data.length - 1].id);
      })
      .catch((err) => { 
        console.log(err)
      })
  }
  const addItem = (item: Item) => {
    axios
      .post("http://127.0.0.1:8000/api/items/add", item)
      .then(fetchItems)
      .catch((err) => console.log(err))
  }
  const deleteItem = (item_id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/api/items/delete/${item_id}`)
      .then(fetchItems)
      .catch((err) => console.log(err))
  }

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="submit__form">
        <Form
          onUpdate={(obj) => addItem({
            id: lastId + 1,
            description: obj.description,
            amount: obj.amount,
            category: obj.category,
          })}
          categories={categories}
        />
        <Tracker
          onSelectCategory={(category) => {
            setSelectedCategory(category);
          }}
        />
        <Table
          itemList={visibleItems}
          onDelete={(id) => {
            console.log(id)
            deleteItem(id);
          }}
        />
      </div>
    </div>
  );
}

export default App;
