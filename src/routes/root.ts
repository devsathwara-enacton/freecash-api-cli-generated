import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    async function (request: FastifyRequest, reply: FastifyReply) {
      console.log(request);
      return {
        root: "true",
      };
    }
  );
};
export default root;
