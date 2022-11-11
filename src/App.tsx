import { Container } from "@mui/material";
import MainLayout from "components/layout/MainLayout";
import TodoList from "components/organisms/TodoList/TodoList";
import * as React from "react";

function App() {
  return (
    <React.Suspense fallback="loading...">
      <MainLayout>
        <Container fixed>
          <TodoList />
        </Container>
      </MainLayout>
    </React.Suspense>
  );
}

export default App;
