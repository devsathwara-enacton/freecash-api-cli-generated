import { FastifyInstance, FastifyPluginAsync } from "fastify";
// import { isAuthenticated } from "../../middleware/authMiddleware.js";
import { fetchTaskSchema } from "./schema.ts";
import { fetch } from "./controller.ts";
const task: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts
): Promise<void> => {
  fastify.get("/", { schema: fetchTaskSchema }, fetch);
};
export default task;
