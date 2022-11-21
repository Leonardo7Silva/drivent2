import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import paymentServices from "@/services/payment-service";

export async function getpayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const { userId } = req;
  const aux = isNaN(parseInt(ticketId));
  if(typeof ticketId === undefined || aux) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try{
    const ticketNumber = parseInt(ticketId);
    const payments = await paymentServices.getAllPaymants(userId, ticketNumber);
    return res.status(200).send(payments);
  }catch(error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "badRequest") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    console.log(error);
  }
}
