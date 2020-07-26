class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }
  calculateAverageSleep(id) {
    let sleepForThisUser = this.sleepData.filter((sleep) => id === sleep.userID);
    const averageSleepHours =
      sleepForThisUser.reduce((sumSoFar, sleepDay) => {
        return (sumSoFar += sleepDay.hoursSlept);
      }, 0) / sleepForThisUser.length;
    return parseFloat(averageSleepHours.toFixed(1)) || undefined;
  }

  calculateAverageSleepQuality(id) {
    let sleepForThisUser = this.sleepData.filter((sleep) => id === sleep.userID);
    const averageSleepQuality =
      sleepForThisUser.reduce((sumSoFar, sleep) => {
        return (sumSoFar += sleep.sleepQuality);
      }, 0) / sleepForThisUser.length;
    return parseFloat(averageSleepQuality.toFixed(1)) || undefined;
  }

  calculateDailySleep(id, date) {
    let findSleepByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepByDate.hoursSlept;
  }

  calculateDailySleepQuality(id, date) {
    let findSleepQualityByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepQualityByDate.sleepQuality;
  }

  // output for weeks is [{date: yyyy/mm/dd, amount: 00, unit: 'unit'}, ...x7]
  getWeekOfHoursSlept(id, endDate) {
    return this.getWeekOfData(id, endDate).map((day) => {
      return { date: day.date, amount: day.hoursSlept, unit: 'hours' };
    });
  }

  getWeekOfQualitySlept(id, endDate) {
    return this.getWeekOfData(id, endDate).map((day) => {
      return { date: day.date, amount: day.sleepQuality, unit: 'stars' };
    });
  }

  //helper function for isolating a week
  getWeekOfData(id, endDate) {
    const sleepForThisUser = this.sleepData.filter((sleep) => id === sleep.userID);
    const firstIndex = sleepForThisUser.findIndex((day) => day.date === endDate);
    return sleepForThisUser.slice(firstIndex - 6, firstIndex + 1);
  }

  calculateAllUserAvgSleepMetric(metric) {
    let totalSleepMetric = this.sleepData.reduce((sumSoFar, sleepInstance) => {
      sumSoFar += sleepInstance[metric];
      return sumSoFar;
    }, 0);
    const averageSleepMetric = totalSleepMetric / this.sleepData.length;
    return parseFloat(averageSleepMetric.toFixed(1)) || undefined;
  }

  getUsersWithQualityAbove3(endDate) {
    const uniqueUsers = this.getUniqueUserIDs();
    return uniqueUsers.filter((user) => {
      let totalUserSleepQualityForWeek = this.getWeekOfData(user, endDate).reduce((sum, sleepInstance) => {
        return (sum += sleepInstance.sleepQuality);
      }, 0);
      return totalUserSleepQualityForWeek / 7 > 3;
    });
  }

  getUniqueUserIDs() {
    return this.sleepData.reduce((users, sleepInstance) => {
      if (!users.includes(sleepInstance.userID)) {
        users.push(sleepInstance.userID);
      }
      return users;
    }, []);
  }

  getSleepWinnerForDay(date, givenData, users) {
    const filterDate = givenData.filter((dataPt) => {
      return dataPt.date === date;
    });
    const sortedSleepers = filterDate.sort((a, b) => b.hoursSlept - a.hoursSlept);
    const userName = users.users.find((user) => {
      return user.id === sortedSleepers[0].userID;
    }).name;
    let user = { user: userName, hoursSlept: sortedSleepers[0].hoursSlept };
    return user;
  }

  // getWinnerNamesFromList(sortedArray, userRepo) {
  //   let bestSleepers = sortedArray.filter(function (element) {
  //     return element[Object.keys(element)] === Object.values(sortedArray[0])[0];
  //   });

  //   let bestSleeperIds = bestSleepers.map(function (bestSleeper) {
  //     return Object.keys(bestSleeper);
  //   });

  //   return bestSleeperIds.map(function (sleepNumber) {
  //     return userRepo.getDataFromID(parseInt(sleepNumber)).name;
  //   });
  // }
}

export default Sleep;
