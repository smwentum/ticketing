import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@smwentumgittiks/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
