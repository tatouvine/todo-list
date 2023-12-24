import { Todo } from "./utils";

export const createTodo = (data: Todo) => {
  const localStorageList = window.localStorage.getItem("todo-list");
  if (localStorageList) {
    const list: Todo[] = JSON.parse(localStorageList);
    list.push(data);
    window.localStorage.setItem("todo-list", JSON.stringify(list));
  } else {
    throw "error";
  }
};

export const deleteTodo = (idTodo: string) => {
  const localStorageList = window.localStorage.getItem("todo-list");
  let list: Todo[] = [];
  if (localStorageList) {
    list = JSON.parse(localStorageList);
    list = list.filter(({ id }) => idTodo !== id);
    window.localStorage.setItem("todo-list", JSON.stringify(list));
  } else {
    throw "error";
  }
};

export const listTodo = () => {
  const localStorageList = window.localStorage.getItem("todo-list");
  let list: Todo[] = [];
  if (localStorageList) {
    list = JSON.parse(localStorageList);
  } else {
    window.localStorage.setItem("todo-list", JSON.stringify(list));
  }
  return { data: list };
};

export const updateTodo = (data: Todo) => {
  const localStorageList = window.localStorage.getItem("todo-list");
  let list: Todo[] = [];
  if (localStorageList) {
    list = JSON.parse(localStorageList);
    list = list.map((value) =>
      value.id === data.id ? { ...value, ...data } : value,
    );
    window.localStorage.setItem("todo-list", JSON.stringify(list));
  } else {
    throw "error";
  }
};
