// const distance =(location)=>{
//     const a = Math.abs(this.lattitude - location.lattitude);
//     const b = Math.abs(this.longitude - location.longitude);
//     return Math.sqrt(a*a + b*b);
//   }
class Location {
  constructor(lattitude, longitude) {
    this.lattitude = lattitude;
    this.longitude = longitude;
  }
  distance(location) {
    const a = Math.abs(this.lattitude - location.lattitude);
    const b = Math.abs(this.longitude - location.longitude);
    return Math.sqrt(a * a + b * b);
  }
}

module.exports = Location;
