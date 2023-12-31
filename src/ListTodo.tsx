import { Collapse, Button, Dropdown, Col, Checkbox, theme } from "antd";
import { ModalCreate } from "./modal/ModalCreate";
import { useState } from "react";
import { Todo } from "./utils";
import { ModalDelete } from "./modal/ModalDelete";
import { ModalUpdate } from "./modal/ModalUpdate";
import { useTranslation } from "react-i18next";
import { SettingOutlined } from "@ant-design/icons";
import * as React from "react";
import { useListTodo, useUpdateCheckTodo } from "./TodoSlice";

export const ListTodo = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);

  const [recordDeleteTodo, setRecordDeleteTodo] = useState<Todo | undefined>(
    undefined,
  );

  const [recordModalUpdate, setRecordModalUpdate] = useState<Todo | undefined>(
    undefined,
  );

  const [t] = useTranslation("global");

  const { data } = useListTodo();
  const { mutate } = useUpdateCheckTodo();
  const { token } = theme.useToken();

  return (
    <div>
      <ModalCreate
        onHide={() => {
          setIsModalCreateOpen(false);
        }}
        show={isModalCreateOpen}
      />
      {recordDeleteTodo && (
        <ModalDelete
          record={recordDeleteTodo}
          show={!!recordDeleteTodo}
          onHide={() => {
            setRecordDeleteTodo(undefined);
          }}
        />
      )}
      {recordModalUpdate && (
        <ModalUpdate
          onHide={() => {
            setRecordModalUpdate(undefined);
          }}
          record={recordModalUpdate}
          show={!!recordModalUpdate}
        />
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 0 8px 0",
        }}
      >
        <Button
          onClick={(event) => {
            event.stopPropagation();
            setIsModalCreateOpen(true);
          }}
        >
          {t("common.create")}
        </Button>
      </div>
      <div style={{ overflow: "auto", width: "100%" }}>
        <Collapse
          style={{ width: "100%" }}
          items={data?.map((todo, index) => ({
            id: todo.id,
            key: todo.id,
            label: todo.title,
            children: <p>{todo.description}</p>,
            extra: (
              <>
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: t("common.edit"),
                        key: "edit",
                        onClick: (event) => {
                          event.domEvent.stopPropagation();
                          setRecordModalUpdate(todo);
                        },
                      },
                      {
                        label: t("common.delete"),
                        key: "delete",
                        onClick: (event) => {
                          event.domEvent.stopPropagation();
                          setRecordDeleteTodo(todo);
                        },
                      },
                    ],
                  }}
                  trigger={["click"]}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <SettingOutlined />
                  </a>
                </Dropdown>
                <Checkbox
                  style={{ marginLeft: 10 }}
                  checked={todo.checked}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  onChange={(event) => {
                    event.stopPropagation();
                    mutate({
                      idTodo: todo.id,
                      checked: event.target.checked,
                    });
                  }}
                />
              </>
            ),
          }))}
        />
      </div>
    </div>
  );
};
