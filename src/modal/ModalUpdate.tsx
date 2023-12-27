import { FC } from "react";
import { Todo } from "../utils";
import { Input, Modal, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useUpdateTodo } from "../TodoSlice";
import { useTranslation } from "react-i18next";

export type ModalUpdateProps = {
  record: Todo;
  show: boolean;
  onHide: () => void;
};

export const ModalUpdate: FC<ModalUpdateProps> = ({ onHide, show, record }) => {
  const [t] = useTranslation("global");

  const { control, handleSubmit } = useForm<Todo>({ defaultValues: record });

  const { mutate } = useUpdateTodo();

  const onSubmit = handleSubmit((dataUpdate) => {
    const res: Todo = {
      ...dataUpdate,
    };
    mutate(res);
    onHide();
  });

  return (
    <Modal
      title={t("modal.update.title")}
      open={show}
      onOk={onSubmit}
      onCancel={onHide}
      okText={t("modal.common.update")}
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
