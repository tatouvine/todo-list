import { FC } from "react";
import { Modal, Typography } from "antd";
import { useDeleteTodo } from "../TodoSlice";
import { Todo } from "../utils";
import { useTranslation } from "react-i18next";

export type ModalDeleteProps = {
  record: Todo;
  show: boolean;
  onHide: () => void;
};

export const ModalDelete: FC<ModalDeleteProps> = ({ onHide, show, record }) => {
  const [t] = useTranslation("global");
  const { mutate } = useDeleteTodo();
  return (
    <Modal
      title={t("modal.delete.title")}
      open={show}
      onOk={() => {
        mutate(record.id);
        onHide();
      }}
      onCancel={onHide}
      okText={t("modal.common.delete")}
      cancelText={t("modal.common.cancel")}
    >
      <Typography.Text>{t("modal.delete.description")}</Typography.Text>
    </Modal>
  );
};
