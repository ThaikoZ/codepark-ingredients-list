import apiClient from "./api-client";

export interface Item {
  id: number;
  description: string;
  amount: number;
  category: string;
}

class ItemService {
  getAllItems() {
    const controller = new AbortController();
    const request = apiClient.get<Item[]>("/items", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  addItem(item: Item) {
    const controller = new AbortController();
    const request = apiClient.post("/items/add", item, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  deleteItem(item_id: number) {
    const controller = new AbortController();
    const request = apiClient.delete(`/items/delete/${item_id}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new ItemService();
