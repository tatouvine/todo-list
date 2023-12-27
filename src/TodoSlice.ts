import { Todo } from "./utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Todo) => {
      const localStorageList = window.localStorage.getItem("todo-list");
      if (localStorageList) {
        const list: Todo[] = JSON.parse(localStorageList);
        list.push(data);
        window.localStorage.setItem("todo-list", JSON.stringify(list));
      } else {
        throw "error";
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todo"] }),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (idTodo: string) => {
      const localStorageList = window.localStorage.getItem("todo-list");
      let list: Todo[] = [];
      if (localStorageList) {
        list = JSON.parse(localStorageList);
        list = list.filter(({ id }) => idTodo !== id);
        window.localStorage.setItem("todo-list", JSON.stringify(list));
      } else {
        throw "error";
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todo"] }),
  });
};

export const useListTodo = () =>
  useQuery({
    queryKey: ["todo"],
    queryFn: () => {
      const localStorageList = window.localStorage.getItem("todo-list");
      let list: Todo[] = [];
      if (localStorageList) {
        list = JSON.parse(localStorageList);
      } else {
        window.localStorage.setItem("todo-list", JSON.stringify(list));
      }
      return list;
    },
  });

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Todo) => {
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
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todo"] }),
  });
};

export const useUpdateCheckTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      idTodo,
      checked,
    }: {
      idTodo: string;
      checked: boolean;
    }) => {
      const localStorageList = window.localStorage.getItem("todo-list");
      let list: Todo[] = [];
      if (localStorageList) {
        list = JSON.parse(localStorageList);
        list = list.map((value) =>
          value.id === idTodo ? { ...value, checked } : value,
        );
        window.localStorage.setItem("todo-list", JSON.stringify(list));
      } else {
        throw "error";
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todo"] }),
  });
};
