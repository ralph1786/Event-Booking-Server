const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { transformBooking, transformEvent } = require("./merge");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const listBookings = await Booking.find({ user: req.userId }); //Returns bookings that belong to the user currently logged in.
      return listBookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const { eventId } = args;
    try {
      const fetchedEvent = await Event.findOne({ _id: eventId });
      const newBooking = new Booking({
        user: req.userId,
        event: fetchedEvent
      });
      const savedBooking = await newBooking.save();
      return transformBooking(savedBooking);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const { bookingId } = args;
    try {
      const foundBooking = await Booking.findById(bookingId).populate("event");
      const event = transformEvent(foundBooking.event);
      await Booking.deleteOne({ _id: bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  }
};
