const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  // Below are the resolvers
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const { title, description, price, date, poster } = args.eventInput;
    const newEvent = new Event({
      title,
      description,
      price,
      poster,
      date: new Date(date),
      creator: req.userId
    });
    let createdEvent;
    try {
      const event = await newEvent.save();

      createdEvent = transformEvent(event);
      const creator = await User.findById(req.userId);

      creator.createdEvents.push(newEvent);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
