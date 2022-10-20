import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

import {
  validationRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequest,
} from '@smwentumgittiks/common';

import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('price must be provided and is greater than zero'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      // console.log('ticket not found');
      throw new NotFoundError();
    }

    if (ticket.orderId) {
      throw new BadRequest('cannot reserve an edited ticket');
    }

    //console.log('current user', req.currentUser!);
    // console.log('ticket: ', ticket);
    if (ticket.userId !== req.currentUser!.id) {
      // console.log("user doesn't own ticket");
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
