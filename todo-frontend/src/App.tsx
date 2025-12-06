import { Navigate, Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/404';
import CategoriesAddPage from './pages/Categories/Add';
import CategoriesDeletePage from './pages/Categories/Delete';
import CategoriesEditPage from './pages/Categories/Edit';
import CategoriesPage from './pages/Categories/Home';
import TodosAddPage from './pages/Todos/Add';
import TodosDeletePage from './pages/Todos/Delete';
import TodosEditPage from './pages/Todos/Edit';
import TodosPage from './pages/Todos/Home';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={<TodosPage />}
        />
        <Route
          path="todos"
          element={<TodosPage />}
        >
          <Route
            path="add"
            element={<TodosAddPage />}
          />
          <Route
            path=":id"
            element={<TodosEditPage />}
          />
          <Route
            path=":id/delete"
            element={<TodosDeletePage />}
          />
        </Route>
        <Route
          path="categories"
          element={<CategoriesPage />}
        >
          <Route
            path="add"
            element={<CategoriesAddPage />}
          />
          <Route
            path=":id"
            element={<CategoriesEditPage />}
          />
          <Route
            path=":id/delete"
            element={<CategoriesDeletePage />}
          />
        </Route>
        <Route
          path="/404"
          element={<NotFoundPage />}
        />
        {/* Catch all - redirect to root */}
        <Route
          path="*"
          element={
            <Navigate
              to="/404"
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
