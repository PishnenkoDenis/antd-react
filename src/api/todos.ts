import axios from "axios";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async () => await axios.get<ITodo[]>(TODOS_URL);
