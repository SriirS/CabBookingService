const Trip = require('./Trip');
class Rider {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.currentTrip;
  }
  updateTrip(cab, from, to, price) {
    this.currentTrip = new Trip('', from, to, price, cab);
  }
  getRiderDetails() {
    return { id: this.id, name: this.name };
  }
  getCurrentTrip() {
    if (!this.currentTrip) return {};
    console.log(this.currentTrip);
    return {
      cab: this.currentTrip.cab.getCabDetails(),
      price: this.currentTrip.price,
      from: this.currentTrip.fromPoint,
      to: this.currentTrip.toPoint,
      status: this.currentTrip.status,
    };
  }
}

module.exports = Rider;
