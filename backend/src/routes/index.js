import AuthRoutes from "./AuthRoutes.js";
import PostRoutes from "./PostRoutes.js";
import CommentRoutes from "./CommentRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/auth", AuthRoutes);
  app.use("/api/posts", PostRoutes);
  app.use("/api/comments", CommentRoutes);
};
