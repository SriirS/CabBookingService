const Trip = require('./Trip');
const Location = require('./Location');

class Cab {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isAvailable = true;
    this.currentTrip;
    this.currentLocation;
  }

  updateLocation(location) {
    this.currentLocation = location;
  }

  updateTrip(rider, from, to, price, status) {
    this.currentTrip = new Trip(rider, from, to, price);
  }
  updateAvailability(avilable) {
    this.isAvailable = avilable;
  }
  getCabDetails() {
    return { id: this.id, name: this.name };
  }
}
module.exports = Cab;
