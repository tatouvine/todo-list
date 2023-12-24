import { FC } from "react";
import { Todo } from "../utils";
import { Input, Modal, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { updateTodo } from "../TodoSlice";

export type ModalUpdateProps = {
  record: Todo;
  show: boolean;
  onHide: () => void;
};

export const ModalUpdate: FC<ModalUpdateProps> = ({ onHide, show, record }) => {
  const { control, handleSubmit } = useForm<Todo>({ defaultValues: record });

  const onSubmit = handleSubmit((dataUpdate) => {
    const res: Todo = {
      ...dataUpdate,
    };
    updateTodo(res);
    onHide();
  });

  return (
    <Modal title="Update todo" open={show} onOk={onSubmit} onCancel={onHide}>
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
