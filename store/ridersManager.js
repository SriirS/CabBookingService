let riders = new Object();
class RidersManager {
  constructor() {}
  registerRider(rider) {
    if (riders.hasOwnProperty(rider.id)) {
      return {
        err: true,
        msg: 'Sorry, rider is already present in our system',
      };
    } else {
      riders[rider.id] = rider;
      return { err: false, data: riders[rider.id] };
    }
  }
  getRider(riderId) {
    if (riders.hasOwnProperty(riderId)) {
      return riders[riderId];
    } else {
      return { err: true, msg: 'Sorry, rider is not present in our system' };
    }
  }
  getAllRiders() {
    const result = [];
    Object.keys(riders).forEach((riderId) => {
      const rider = riders[riderId];
      let data = rider.getRiderDetails();
      data.trip = rider.getCurrentTrip();
      result.push(data);
    });
    return { err: false, data: result };
  }
}

module.exports = RidersManager;
