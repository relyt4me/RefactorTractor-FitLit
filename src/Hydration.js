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
    return parseFloat(averageOuncesUnrounded.toFixed(2)) || undefined;
  }

  calculateDailyOunces(id, date) {
    const findOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    if (findOuncesByDate) {
      return findOuncesByDate.numOunces;
    }
  }

  getWeekOfOunces(id, endDate) {
    let hydrationForThisUser = this.hydrationData.filter((hydrationInstance) => id === hydrationInstance.userID);
    const firstIndex = hydrationForThisUser.findIndex((day) => day.date === endDate);
    const pastWeek = hydrationForThisUser.slice(firstIndex - 6, firstIndex + 1);
    return pastWeek.map((day) => {
      return { date: day.date, amount: day.numOunces, unit: 'oz' };
    });
  }
}

export default Hydration;