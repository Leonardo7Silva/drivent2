import { AuthenticatedRequest } from "@/middlewares";
import ticketsServices from "@/services/tickets-sevice";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try{
    const types = await ticketsServices.getTheTypes();
    res.status(httpStatus.OK).send(types);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  } 
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;    
  try{
    const tickets = await ticketsServices.getTheTickets(userId);
    res.status(httpStatus.OK).send(tickets);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId = req.body.ticketTypeId as number;
  try{
    const insert = await ticketsServices.postTheTicket(userId, ticketTypeId);
    res.status(httpStatus.CREATED).send(insert);
  }catch(error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

