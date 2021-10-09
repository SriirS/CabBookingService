const states = {
  InProgress: 'inProgress',
  Finished: 'finished',
};

class Trip {
  constructor(rider, from, to, price, cab) {
    this.rider = rider;
    this.cab = cab;
    this.price = price;
    this.fromPoint = from;
    this.toPoint = to;
    this.status = states.InProgress;
  }
  endTrip() {
    this.status = states.Finished;
  }
  getTripDetails() {
    return {
      price: this.price,
      from: this.fromPoint,
      to: this.toPoint,
      states: this.status,
    };
  }
}

module.exports = Trip;
