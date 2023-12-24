import { Collapse, Button } from "antd";

export const ListTodo = () => {
  const { data } = {
    data: [
      { id: "my-id1", title: "my-title1", description: "bla bla bla" },
      { id: "my-id2", title: "my-title2", description: "bla bla bla" },
      { id: "my-id3", title: "my-title3", description: "bla bla bla" },
    ],
  }; // getTodo();

  return (
    <div>
      <div>
        <Collapse
          items={data.map(({ id, title, description }) => ({
            id,
            label: title,
            children: <p>{description}</p>,
            extra: <Button danger={true}>Delete</Button>,
          }))}
        />
      </div>
      <div>
        <Button>Create</Button>
      </div>
    </div>
  );
};
