import { Ticket } from "@prisma/client";
import Joi from "joi";

export const createTicketSchema = Joi.object<NewTicket>({
  ticketTypeId: Joi.number().required(),
});

export type NewTicket = Pick<Ticket, "ticketTypeId">
