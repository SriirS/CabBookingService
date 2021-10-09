'use strict';
const { Rider, Location } = require('../models');
const CabsManager = require('../store/cabsManager');
const RidersManager = require('../store/ridersManager');
const TripsManager = require('../store/TripsManager');

const tripsManager = new TripsManager();
const ridersManager = new RidersManager();
const cabsManager = new CabsManager();

const API = {
  register: async (req, res) => {
    const { riderId, name } = req.body;
    const result = ridersManager.registerRider(new Rider(riderId, name));
    res.status(result.err ? 500 : 200).json(result);
  },
  getRiders: async (req, res) => {
    const result = ridersManager.getAllRiders();
    res.status(result.err ? 500 : 200).json(result);
  },
  bookings: async (req, res) => {
    const riderId = req.params.riderId;
    const result = tripsManager.tripHistory(riderId);
    res.status(result.err ? 500 : 200).json(result);
  },
  book: async (req, res) => {
    const riderId = req.params.riderId;
    let { start, end } = req.body;
    const source = new Location(start.lattitude, start.longitude);
    const destination = new Location(end.lattitude, end.longitude);
    const result = tripsManager.createTrip(
      ridersManager.getRider(riderId),
      source,
      destination
    );
    res.status(result.err ? 500 : 200).json(result);
  },
  getTrip: async (req, res) => {
    const riderId = req.params.riderId;
    const result = tripsManager.getCurrentTrip(riderId);
    res.status(result.err ? 500 : 200).json(result);
  },
  getAllTrips: async (req, res) => {
    const result = tripsManager.getAllTrips();
    res.status(result.err ? 500 : 200).json(result);
  },
};

const init = (router) => {
  router.route('/riders/register').post(API.register);
  router.route('/riders').get(API.getRiders);
  router.route('/riders/:riderId/book').post(API.book);
  router.route('/riders/:riderId').get(API.getTrip);
  router.route('/riders/:riderId/bookings').get(API.bookings);
  router.route('/trips').get(API.getAllTrips);
  return router;
};

ridersManager.registerRider(new Rider('r1', 'rider1'));
ridersManager.registerRider(new Rider('r2', 'rider2'));
ridersManager.registerRider(new Rider('r3', 'rider3'));
ridersManager.registerRider(new Rider('r4', 'rider4'));
const rider1 = ridersManager.getRider('r1');
const rider2 = ridersManager.getRider('r2');
tripsManager.createTrip(
  rider1,
  new Location(0.0, 0.0),
  new Location(500.0, 500.0)
);
tripsManager.createTrip(
  rider2,
  new Location(0.0, 0.0),
  new Location(500.0, 500.0)
);

tripsManager.endTrip(cabsManager.getCab('c5'));

tripsManager.tripHistory('r1');
tripsManager.tripHistory('r2');

module.exports = {
  init,
};
