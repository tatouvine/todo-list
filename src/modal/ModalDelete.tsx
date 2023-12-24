import { FC } from "react";
import { Modal, Typography } from "antd";
import { deleteTodo } from "../TodoSlice";
import { Todo } from "../utils";

export type ModalDeleteProps = {
  record: Todo;
  show: boolean;
  onHide: () => void;
};

export const ModalDelete: FC<ModalDeleteProps> = ({ onHide, show, record }) => {
  return (
    <Modal
      title="Delete todo"
      open={show}
      onOk={() => {
        deleteTodo(record.id);
        onHide();
      }}
      onCancel={onHide}
    >
      <Typography.Text>Are you sure to delete this todo</Typography.Text>
    </Modal>
  );
};
