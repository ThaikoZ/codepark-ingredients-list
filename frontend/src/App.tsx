import Form from "./expense-tracker/components/Form";
import Table from "./expense-tracker/components/Table";
import Tracker from "./expense-tracker/components/Tracker";
import { useState, useEffect } from "react";
import ItemsService, { Item } from "./services/items-service";
import UsersService, { TokenForm, UserInfo } from "./services/users-service";
import "./app.css";
import { useNavigate } from "react-router-dom";

export const categories = ["Groceries", "Utilities", "Entertainment"];

function App() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [itemList, setItemList] = useState<Item[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    User: {
      email: "",
      full_name: "",
      id: 0,
    },
  });
  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    authenticateSession();
  }, [itemList]);
  const visibleItems = selectedCategory
    ? itemList.filter((item) => item.category === selectedCategory)
    : itemList;

  const authenticateSession = () => {
    const item = localStorage.getItem("session_token") || "";
    const session_token = JSON.parse(item);
    const token: TokenForm = {
      token_type: session_token.token_type,
      access_token: session_token.access_token,
    };

    const { request, cancel } = UsersService.authenticateUser(token);
    request.then((data) => setUserInfo(data.data));
    request.catch(() => navigate("../../auth/login"));
    return () => cancel();
  };

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
    setItemList([...itemList, item]);

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
        <h1 className="text-center my-3">{userInfo.User.full_name}'s List</h1>
        <Form
          onUpdate={(obj) => {
            addItem({
              id: lastId + 1,
              description: obj.description,
              amount: obj.amount,
              category: obj.category,
            });
            setLastId(lastId + 1);
          }}
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
        <Table itemList={visibleItems} onDelete={(id) => deleteItem(id)} />
      </div>
    </div>
  );
}

export default App;
