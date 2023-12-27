import React from "react";
import { Layout } from "./Layout";
import { ListTodo } from "./ListTodo";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <ListTodo />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
