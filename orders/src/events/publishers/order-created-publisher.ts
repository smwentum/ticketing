import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@smwentumgittiks/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
