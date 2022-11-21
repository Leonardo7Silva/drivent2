import enrollmentRepository from "@/repositories/enrollment-repository";
import { unauthorizedError, notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";

async function getAllPaymants(userId: number, ticketId: number) {
  const validUser = await enrollmentRepository.findUserOfEnrollment(userId);
  if(validUser.userId !== userId || validUser === null) {
    throw unauthorizedError();
  }

  const payments = await paymentRepository.getTheTicketId(ticketId);
  console.log(payments);
  if (!payments || !payments.value) {
    throw notFoundError();
  }

  return payments;
}

const paymentServices = {
  getAllPaymants,
};

export default paymentServices;
