import sleepData from './data/sleep';

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
    return parseFloat(averageSleepHours.toFixed(2)) || undefined;
  }

  calculateAverageSleepQuality(id) {
    let sleepForThisUser = this.sleepData.filter((sleep) => id === sleep.userID);
    const averageSleepQuality =
      sleepForThisUser.reduce((sumSoFar, sleep) => {
        return (sumSoFar += sleep.sleepQuality);
      }, 0) / sleepForThisUser.length;
    return parseFloat(averageSleepQuality.toFixed(2)) || undefined;
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

  // replaced
  calculateWeekSleep(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }

  // replaced
  calculateWeekSleepQuality(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  }

  calculateAllUserSleepQuality() {
    let totalSleepQuality = this.sleepData.reduce((sumSoFar, sleepInstance) => {
      sumSoFar += sleepInstance.sleepQuality;
      return sumSoFar;
    }, 0);
    const averageSleepQuality = totalSleepQuality / this.sleepData.length;
    return parseFloat(averageSleepQuality.toFixed(2)) || undefined;
  }

  getUsersWithQualityAbove3(endDate) {
    const uniqueUsers = this.getUniqueUserIDs();
    // const uniqueUsers = this.sleepData.reduce((users, sleepInstance) => {
    //   if (!users.includes(sleepInstance.userID)) {
    //     users.push(sleepInstance.userID);
    //   }
    //   return users;
    // }, []);
    return uniqueUsers.filter((user) => {
      let totalUserSleepQualityForWeek = this.getWeekOfData(user, endDate).reduce((sum, sleepInstance) => {
        return (sum += sleepInstance.sleepQuality);
      }, 0);
      return totalUserSleepQualityForWeek / 7 > 3;
    });
  }
  // Helper function for above
  getUniqueUserIDs() {
    return this.sleepData.reduce((users, sleepInstance) => {
      if (!users.includes(sleepInstance.userID)) {
        users.push(sleepInstance.userID);
      }
      return users;
    }, []);
  }

  //replaced with above to not use userRepo
  determineBestSleepers(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, 'sleepQuality', timeline);

    return Object.keys(userSleepObject)
      .filter(function (key) {
        return (
          userSleepObject[key].reduce(function (sumSoFar, sleepQualityValue) {
            sumSoFar += sleepQualityValue;
            return sumSoFar;
          }, 0) /
            userSleepObject[key].length >
          3
        );
      })
      .map(function (sleeper) {
        return userRepo.getDataFromID(parseInt(sleeper)).name;
      });
  }

  getSleepWinnerForDay(date) {
    const uniqueUsers = this.getUniqueUserIDs();
    return uniqueUsers
      .sort((userA, userB) => {
        return this.calculateDailySleep(userB, date) - this.calculateDailySleep(userA, date);
      })
      .filter((user, index, sortedUniqueUsers) => {
        return this.calculateDailySleep(user, date) === this.calculateDailySleep(sortedUniqueUsers[0], date);
      }, []);
  }
  determineSleepWinnerForWeek(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'sleepQuality', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  determineSleepHoursWinnerForDay(date, userRepo) {
    let timeline = userRepo.chooseDayDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter(function (element) {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0];
    });

    let bestSleeperIds = bestSleepers.map(function (bestSleeper) {
      return Object.keys(bestSleeper);
    });

    return bestSleeperIds.map(function (sleepNumber) {
      return userRepo.getDataFromID(parseInt(sleepNumber)).name;
    });
  }
}

export default Sleep;
