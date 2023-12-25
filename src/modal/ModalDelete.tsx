import { FC } from "react";
import { Modal, Typography } from "antd";
import { deleteTodo } from "../TodoSlice";
import { Todo } from "../utils";
import { useTranslation } from "react-i18next";

export type ModalDeleteProps = {
  record: Todo;
  show: boolean;
  onHide: () => void;
};

export const ModalDelete: FC<ModalDeleteProps> = ({ onHide, show, record }) => {
  const [t] = useTranslation("global");

  return (
    <Modal
      title={t("modal.delete.title")}
      open={show}
      onOk={() => {
        deleteTodo(record.id);
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
