import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getpayments } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getpayments);

export { paymentsRouter };
