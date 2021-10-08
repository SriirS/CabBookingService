const Cab = require("../models/Cab");
const Trip = require("../models/Trip");
const CabsManager = require("./cabsManager");
const MAX_DISTANCE = 10;
const MIN_PRICE = 50;

const totalPrice = (from, to) => {
  let price = MIN_PRICE;
  const a = Math.abs(to.lattitude - from.lattitude);
  const b = Math.abs(to.longitude - from.longitude);
  const distance = Math.sqrt(a*a + b*b);
  //console.log(distance);
  let start = 1;
  while(start<=distance){
    if(start <=2) price += 10;
    else if(start <=5) price += 8;
    else price += 5;
    start++;
  }
  return price;
}
let trips = new Object();
class TripsManager {
  constructor(){
    this.CabsManager = new CabsManager();
  }
  createTrip(rider, from, to){
    const nearByCabs = this.CabsManager.getCabs(from, MAX_DISTANCE);
    const availableCabs = nearByCabs.filter(function(cab){
      return (cab.isAvailable === true && !cab.currentTrip);
    })
    let selectedCab, closestDistance = Infinity;
    availableCabs.forEach(function(cab){
      const distance = cab.currentLocation.distance(from);
      console.log(distance);
      if(distance < closestDistance){
        closestDistance = distance;
        selectedCab = cab;
      }
    });
    let price = totalPrice(from, to);
    let curTrip = new Trip(rider, from, to, price, selectedCab);
    //selectedCab.updateTrip(curTrip.rider, curTrip.fromPoint, curTrip.toPoint, curTrip.price);
    if(selectedCab) selectedCab.updateTrip(curTrip);
    if(!trips.hasOwnProperty(rider.id)){
      trips[rider.id] = new Array();
    }
    trips[rider.id].push(curTrip);
    if(!selectedCab) return new Error('Sorry could not find any cabs');
    console.log(trips);
    return selectedCab;
  }

  tripHistory(riderId){
    return trips[riderId];
  }
  endTrip(cab){
    cab.currentTrip.endTrip();
    //trips[cab.createTrip.rider.id].status = cab.currentTrip.status;
    return {err:false, msg:"Successfully ended trip"};
  }
  getCurrentTrip(riderId){
    const cur = trips[riderId].length;
    return trips[riderId][cur-1];
  }
  getAllTrips(){
    return {err:false, data:trips};
  }
}

module.exports = TripsManager;
