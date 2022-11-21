import { prisma } from "@/config";

async function getTheTicketIdByUser(userId: number) {
  const consult = prisma.payment.findFirst({
    where: { Ticket: { Enrollment: { User: { id: userId } } } },
  });
  return consult;
}

async function getTheTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId: ticketId }
  });
}

const paymentRepository = {
  getTheTicketIdByUser,
  getTheTicketId,
};

export default paymentRepository;
