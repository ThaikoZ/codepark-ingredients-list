import Form from "./expense-tracker/components/Form";
import Table from "./expense-tracker/components/Table";
import Tracker from "./expense-tracker/components/Tracker";
import { useState } from "react";

export const categories = ["Groceries", "Utilities", "Entertainment"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemList, setItemList] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Groceries" },
    { id: 2, description: "bbb", amount: 5, category: "Groceries" },
    { id: 3, description: "ccc", amount: 8, category: "Utilities" },
  ]);
  const [ids, setIds] = useState(itemList.length);

  const visibleItems = selectedCategory
    ? itemList.filter((item) => item.category === selectedCategory)
    : itemList;

  return (
    <div>
      <Form
        onUpdate={(obj) => {
          setItemList([
            ...itemList,
            {
              id: ids + 1,
              description: obj.description,
              amount: obj.amount,
              category: obj.category,
            },
          ]);
          setIds(ids + 1);
        }}
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
          setItemList(itemList.filter((item) => item.id !== id));
        }}
      />
    </div>
  );
}

export default App;
