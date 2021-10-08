'use strict';
const { Cab, Location } = require("../models");
const CabsManager = require("../store/cabsManager");
const TripsManager = require("../store/TripsManager");

const cabsManager = new CabsManager();
const tripsManager = new TripsManager();

const API = {
  registerCab: async(req, res) => {
    const {cabId, name} = req.body;
    const result = cabsManager.registerCab(new Cab(cabId, name));
    res.status(result.err ? 500 : 200).json(result);
  },
  getCabDetails: async(req,res)=>{
    const cabId = req.params.cabId;
    const result = cabsManager.getCab(cabId);
    res.status(result.err ? 500 : 200).json(result);
  },
  getCabs: async(req, res) => {
    const result = cabsManager.getAllCabs();
    res.status(result.err ? 500 : 200).json(result);
  },
  cabLocation: async(req, res) => {
    const cabId = req.params.cabId;
    const {lattitude, longitude} = req.body;
    const result = cabsManager.updateCabLocation(cabId, new Location(lattitude, longitude));
    res.status(result.err ? 500 : 200).json(result);
  },
  cabAvailability: async(req, res) => {
    const cabId = req.params.cabId;
    const {available} = req.body;
    const result = cabsManager.updateCabAvailability(cabId, available);
    res.status(result.err ? 500 : 200).json(result);
  },
  endTrip: async(req, res) => {
    const cabId = req.params.cabId;
    const result = tripsManager.endTrip(cabId);
    res.status(result.err ? 500 : 200).json(result);
  }        
}

const init = (router) => {
  router.route('/cab/register').post(API.registerCab);
  router.route('/cabs').get(API.getCabs);
  router.route('/cabs/:cabId').get(API.getCabDetails).put(API.cabAvailability);
  router.route('/cabs/:cabId/location').post(API.cabLocation);
  router.route('/cabs/:cabId/trip').put(API.endTrip);
  return router;
};

cabsManager.registerCab(new Cab("c1", "driver1"))
cabsManager.registerCab(new Cab("c2", "driver2"))
cabsManager.registerCab(new Cab("c3", "driver3"))
cabsManager.registerCab(new Cab("c4", "driver4"))
cabsManager.registerCab(new Cab("c5", "driver5"))

cabsManager.updateCabLocation("c1", new Location(1.0, 1.0));
cabsManager.updateCabLocation("c2", new Location(2.0, 2.0));
cabsManager.updateCabLocation("c3", new Location(100.0, 100.0));
cabsManager.updateCabLocation("c4", new Location(110.0, 110.0));
cabsManager.updateCabLocation("c5", new Location(4.0, 4.0));

cabsManager.updateCabAvailability("c2", false);
cabsManager.updateCabAvailability("c4", false);

module.exports = {
  init,
};
