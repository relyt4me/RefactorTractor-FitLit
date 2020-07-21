class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }
  calculateAverageOunces(id) {
    let hydrationForThisUser = this.hydrationData.filter((hydrationInstance) => id === hydrationInstance.userID);
    const averageOuncesUnrounded =
      hydrationForThisUser.reduce((sumSoFar, dayHydration) => {
        return (sumSoFar += dayHydration.numOunces);
      }, 0) / hydrationForThisUser.length;
    return parseFloat(averageOuncesUnrounded.toFixed(2));
  }
  calculateDailyOunces(id, date) {
    let findOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    return findOuncesByDate.numOunces;
  }
  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
  calculateRandomWeekOunces(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
}

export default Hydration;
