const { Location } = require('../models');
let cabs = {};
class CabsManager {
  constructor() {}
  registerCab(cab) {
    if (cabs.hasOwnProperty(cab.id)) {
      return { err: true, msg: 'Sorry, cab exists already' };
    } else {
      cabs[cab.id] = cab;
      return { err: false, data: cabs[cab.id] };
    }
  }
  getCab(cabId) {
    if (cabs.hasOwnProperty(cabId)) {
      return cabs[cabId];
    } else {
      return { err: true, msg: 'No matching cab found' };
    }
  }

  updateCabLocation(cabId, location) {
    console.log(cabId);
    if (cabs.hasOwnProperty(cabId)) {
      cabs[cabId].currentLocation = location;
      return { err: false, data: cabs[cabId] };
    } else {
      return { err: true, msg: 'No matching cab found' };
    }
  }

  updateCabAvailability(cabId, avilable) {
    if (cabs.hasOwnProperty(cabId)) {
      cabs[cabId].isAvailable = avilable;
      return { err: false, data: cabs[cabId] };
    } else {
      return { err: true, msg: 'No matching cab found' };
    }
  }

  getCabs(curLocation, distance) {
    let availableCabs = [];
    Object.keys(cabs).forEach(function (id) {
      let cab = cabs[id].currentLocation;
      if (cabs[id].isAvailable && cab.distance(curLocation) <= distance) {
        availableCabs.push(cabs[id]);
      }
    });
    return availableCabs;
  }

  getAllCabs() {
    let result = [];
    Object.keys(cabs).forEach((id) => {
      const cab = cabs[id];
      const data = {
        cabs: cab.getCabDetails(),
        status: cab.isAvailable,
        location: cab.currentLocation,
        trip: (cab.currentTrip && cab.currentTrip.getTripDetails()) || {},
      };
      result.push(data);
    });
    return result;
  }
}
module.exports = CabsManager;
