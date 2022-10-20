import { Ticket } from '../ticket';

it('implement optimistic concurrency control', async () => {
  //create an instance of a ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: 'abc',
  });

  //save the ticket to the database

  await ticket.save();

  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //make two separate changes to the tickets we fetched

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  //save the first fetched ticket
  await firstInstance!.save();
  //save the section  ticket

  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
  throw new Error('Should not be here ');
});

it('increments the verision number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
