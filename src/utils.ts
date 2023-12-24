export type Todo = CreateTodo & {
  id: string;
};

export type CreateTodo = {
  title: string;
  description: string;
};
