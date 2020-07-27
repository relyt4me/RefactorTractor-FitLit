class Activity {
  constructor(activityData) {
    this.activityData = activityData
  }

  getUserDataForDay(id, date, dataType) {
    if(id < 1 || typeof id !== 'number' || date.length !== 10 || typeof date !== 'string'
    || !['numSteps', 'minutesActive', 'flightsOfStairs'].includes(dataType)) {
      return undefined
    }
    let todayActivities = this.activityData.find(data => data.date === date
      && data.userID === id);
      let todayActivity = {};
      todayActivity.date = date;
      todayActivity.amount = todayActivities[dataType];
      todayActivity.type = (dataType === 'numSteps') ? 'steps' : dataType;
      return todayActivity
    }

  getUserWeekData(id, date, dataType) {
    let userActivities = this.activityData.filter(data => data.userID === id);
    const firstIndex = userActivities.findIndex(x => x.date === date);
    const weekData =  userActivities.slice(firstIndex - 6, firstIndex + 1);
    return weekData.reduce((weekList, day) => {
      let type = dataType;
      if(dataType === 'numSteps') {
        type = 'steps'
      }
      let dayData = {date: day.date, amount: day[dataType], unit: type}
      weekList.unshift(dayData);
      return weekList;
    }, [])
  }

  getMilesByDate(id, date, user = undefined) {
    let userStepsByDate = this.getUserDataForDay(id, date, 'numSteps').amount;
    let miles = ((userStepsByDate * user.strideLength) / 5280).toFixed(1)
    return parseFloat(miles) || undefined;
  }


  calculateActiveAverageForWeek(id, date) {
    if(id < 1 || typeof id !== 'number' || date.length !== 10
    || typeof date !== 'string') {
      return undefined
    }
    const weekData = this.getUserWeekData(id, date, 'minutesActive');
    const weeklyAverage = (weekData.reduce((sum, day) => {
      return sum += day.amount
    }, 0) / 7)
    return parseFloat(weeklyAverage.toFixed(1));
  }

  accomplishStepGoal(date, user, dataType) {
    const stepsToday = this.getUserDataForDay(user.id, date, 'numSteps').amount
    if (stepsToday >= user.dailyStepGoal) {
      return true;
    }
    return false
  }

  getDaysGoalExceeded(id, user) {
    if (typeof user !== 'object') {return undefined}
    const daysExceeded = this.activityData.filter(data => {
      return user.id === data.userID && data.numSteps > user.dailyStepGoal})
    return daysExceeded.map(data => data.date) || undefined;
  }

  getStairRecord(id) {
    const recordDays = this.activityData.filter(data => id === data.userID);
    return recordDays.reduce((acc, elem) => {
      return (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc}, 0);
  }

  getOveralUserAverage(date, dataType) {
    const dayData = this.activityData.filter(data => data.date === date)
    const average = parseFloat((dayData.reduce((acc, elem) => {
      return acc += elem[dataType]}, 0) / dayData.length).toFixed(1))
    const overallAverage = {};
    overallAverage[`${dataType}`] = average
    return overallAverage
  }

  getAllUserAverageForDay(date, dataType) {
    const dayData = this.activityData.filter(data => data.date === date)
    const average = parseFloat((dayData.reduce((acc, elem) => {
      return acc += elem[dataType]}, 0) / dayData.length).toFixed(1))
    const overallAverage = {}
    let type = dataType;
    if(dataType === 'numSteps') {
      type = 'steps'
    }
    overallAverage[`${type}`] = average
    return average;
  }

  getStreak(id, dataType) {
    let userActivities = this.activityData.filter(data => data.userID === id);
    userActivities = userActivities.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)});
    let streaks = userActivities.filter((day, i) => {
      if (i >= 2) {
        return userActivities[i - 2][dataType] < userActivities[i - 1][dataType]
        && userActivities[i - 1][dataType] < userActivities[i][dataType]
      }
    });
    return streaks.map(streak => {
      return streak.date;
    })
  }



  getFriendsAverageStepsForWeek(user, date) {
    let averages = []
    user.friends.forEach((friendID) => {
      const friendsActivities = this.getUserWeekData(friendID, date, 'numSteps')
      const userAverage = friendsActivities.reduce((sum, activity) => {
        return sum += activity.amount
      }, 0) / 7
      let object = {}
      object.id = friendID;
      object.avgSteps = parseFloat(userAverage.toFixed(1))
      averages.push(object)
    })
    return averages.sort((a, b) => b.avgSteps - a.avgSteps)
  }

  showChallengeListAndWinner(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date);
    return rankedList.map(friend => {
      const userName = userRepo.users.find(user => user.id === friend.id).name
      return `${userName}: ${friend.avgSteps}`
    })
  }

  getWinnerId(user, date, userRepo) {
    let friends = this.getFriendsAverageStepsForWeek(user, date, userRepo)
    return friends.shift().id
  }

  showcaseWinner(user, date, userRepo) {
    let friendsAverages = this.showChallengeListAndWinner(user, date, userRepo);
    let winner = friendsAverages.shift();
    return winner;
  }
}

export default Activity;
