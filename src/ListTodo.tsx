import { Collapse, Button, Row, Col } from "antd";
import { ModalCreate } from "./modal/ModalCreate";
import { useState } from "react";
import { Todo } from "./utils";
import { listTodo } from "./TodoSlice";
import { ModalDelete } from "./modal/ModalDelete";
import { ModalUpdate } from "./modal/ModalUpdate";
import { useTranslation } from "react-i18next";

export const ListTodo = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);

  const [recordDeleteTodo, setRecordDeleteTodo] = useState<Todo | undefined>(
    undefined,
  );

  const [recordModalUpdate, setRecordModalUpdate] = useState<Todo | undefined>(
    undefined,
  );
  const { data } = listTodo();

  const [t] = useTranslation("global");

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
      <div style={{ overflow: "auto" }}>
        <Collapse
          items={data.map((todo) => ({
            id: todo.id,
            key: todo.id,
            label: todo.title,
            children: <p>{todo.description}</p>,
            extra: (
              <Row gutter={[16, 0]}>
                <Col>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      setRecordModalUpdate(todo);
                    }}
                  >
                    {t("common.edit")}
                  </Button>
                </Col>
                <Col>
                  <Button
                    danger={true}
                    onClick={(event) => {
                      event.stopPropagation();
                      setRecordDeleteTodo(todo);
                    }}
                  >
                    {t("common.delete")}
                  </Button>
                </Col>
              </Row>
            ),
          }))}
        />
      </div>
    </div>
  );
};
