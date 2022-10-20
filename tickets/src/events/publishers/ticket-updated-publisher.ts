import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@smwentumgittiks/common';

//test comment to get ticketing to update
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
