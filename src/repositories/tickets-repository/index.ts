import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

export async function getAllTicketsTypes() {
  return prisma.ticketType.findMany();
}

export async function getAllTickets(userId: number) {
  return prisma.ticket.findFirst({
    where: { Enrollment: { User: { id: userId } } },
    include: { TicketType: true }   
  });    
}

export async function insertTicket(tickets: Prisma.TicketUncheckedCreateInput) {
  return await prisma.ticket.create({
    data: tickets, include: { TicketType: true }
  });
}

const ticketsRepository = {
  getAllTicketsTypes,
  getAllTickets,
  insertTicket
};

export default ticketsRepository;
