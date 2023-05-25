import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo/mod.ts";
import { getDb } from "../helpers/db_client.ts";

const router = new Router();

interface Todo {
  _id: { $oid: string };
  text: string;
}

router.get("/todos", async (ctx) => {
  const todos = await getDb().collection<Todo>("todo-app").find();
  const transformedTodos = todos.map((todo) => {
    return { id: todo._id.$oid, text: todo.text };
  });
  ctx.response.body = { todos: transformedTodos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = {
    _id: { $oid: "" },
    text: data.text,
  };

  const id = await getDb().collection<Todo>("todo-app").insertOne(newTodo);
  newTodo._id.$oid = id.$oid;

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body().value;

  const result = await getDb()
    .collection<Todo>("todo-app")
    .updateOne({ _id: ObjectId(tid) }, { $set: { text: data.text } });

  if (result.modifiedCount === 0) {
    ctx.response.body = { message: "Todo not found" };
  } else {
    ctx.response.body = { message: "Updated todo" };
  }
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;

  const result = await getDb()
    .collection<Todo>("todo-app")
    .deleteOne({
      _id: ObjectId(tid),
    });

  if (result.deletedCount === 0) {
    ctx.response.body = { message: "Todo not found" };
  } else {
    ctx.response.body = { message: "Deleted todo" };
  }
});

export default router;
