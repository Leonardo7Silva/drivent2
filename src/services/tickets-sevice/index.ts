import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function getTheTypes() {
  return await ticketsRepository.getAllTicketsTypes();
}

async function getTheTickets(userId: number) {
  const tickets =  await ticketsRepository.getAllTickets(userId);
  if(!tickets.status) {
    throw notFoundError();
  }
  return tickets;
}

async function postTheTicket(userId: number, ticketTypeId: number) {
  const validUser = await enrollmentRepository.findUserOfEnrollment(userId);
    
  if(!validUser) {
    throw notFoundError();
  }
  const ticket = {
    ticketTypeId,
    enrollmentId: validUser.id,
    status: TicketStatus.RESERVED
  };
  const insert = await ticketsRepository.insertTicket(ticket);
  return insert;
}

const ticketsServices = {
  getTheTypes,
  getTheTickets,
  postTheTicket,
};

export default ticketsServices;
