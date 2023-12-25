import { FC } from "react";
import { Input, Modal, Typography } from "antd";
import { CreateTodo, Todo } from "../utils";
import { v4 as uuid } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { createTodo } from "../TodoSlice";
import { useTranslation } from "react-i18next";

export type ModalCreateProps = {
  show: boolean;
  onHide: () => void;
};

export const ModalCreate: FC<ModalCreateProps> = ({ show, onHide }) => {
  const [t] = useTranslation("global");
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
      title={t("modal.create.title")}
      open={show}
      onOk={onSubmit}
      onCancel={onHide}
      okText={t("modal.common.create")}
      cancelText={t("modal.common.cancel")}
    >
      <form onSubmit={onSubmit}>
        <div>
          <Typography.Title level={5}>{t("form.title")}</Typography.Title>
          <Controller
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t("form.title")} />
            )}
            name={"title"}
          />
        </div>
        <div>
          <Typography.Title level={5}>{t("form.description")}</Typography.Title>
          <Controller
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t("form.description")} />
            )}
            name={"description"}
          />
        </div>
      </form>
    </Modal>
  );
};
