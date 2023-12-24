import { FC } from "react";
import { Input, Modal, Typography } from "antd";
import { CreateTodo, Todo } from "../utils";
import { v4 as uuid } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { createTodo } from "../TodoSlice";

export type ModalCreateProps = {
  show: boolean;
  onHide: () => void;
};

export const ModalCreate: FC<ModalCreateProps> = ({ show, onHide }) => {
  const { control, handleSubmit, reset } = useForm<CreateTodo>();

  const onSubmit = handleSubmit(({ title, description }) => {
    const res: Todo = {
      id: uuid(),
      title: title,
      description: description,
    };
    createTodo(res);
    onHide();
    reset();
  });

  return (
    <Modal
      title="Create new todo"
      open={show}
      onOk={onSubmit}
      onCancel={onHide}
    >
      <form onSubmit={onSubmit}>
        <div>
          <Typography.Title level={5}>Title</Typography.Title>
          <Controller
            control={control}
            render={({ field }) => <Input {...field} placeholder="Title" />}
            name={"title"}
          />
        </div>
        <div>
          <Typography.Title level={5}>Description</Typography.Title>
          <Controller
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Description" />
            )}
            name={"description"}
          />
        </div>
      </form>
    </Modal>
  );
};
