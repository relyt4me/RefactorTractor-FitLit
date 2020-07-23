class Activity { //should probably be renamed
  constructor(activityData) { //constructor sucks but has to stay
    this.activityData = activityData //
  }
  //// begin unused methods
  getMilesByDate(id, date, user = undefined, userRepo) {  //returns miles walked on a specific date
    // THIS IS NEVER USED needs to be displayed on page
    let userStepsByDate = this.getUserDataForDay(id, date, 'numSteps').amount;
    let miles = parseFloat(((userStepsByDate * user.strideLength) / 5280).toFixed(1))
    return miles || undefined;

  }
  // // not used

  // replaced
  // getActiveMinutesByDate(id, date) { //return total minues active on a date for a specific user
  //   let userActivityByDate = this.activityData.find(data => id === data.userID && date === data.date);
  //   return userActivityByDate.minutesActive;
  // }

  getUserDataForDay(id, date, dataType) {// should take user instead of id
    // console.log('typeof', typeof id)
    if(id < 1 || typeof id !== 'number' || date.length !== 10 || typeof date !== 'string'
    || !['numSteps', 'minutesActive', 'flightsOfStairs'].includes(dataType)) {
      return undefined
    }
    let todayActivities = this.activityData.find(data => data.date === date && data.userID === id);
    let todayActivity = {};
    todayActivity.date = date;
    todayActivity.amount = todayActivities[dataType];
    todayActivity.type = (dataType === 'numSteps') ? 'steps' : dataType;
    return todayActivity
    // returns { date: '2019/06/15', amount: 3577, type: 'steps' }
  }

  userDataForToday(id, date, userRepo, dataType) { //return steps for specific user on specific daten
    return this.activityData.find(data => data.date === date &&
       data.userID === id)[dataType] || undefined
    // let userData = userRepo.getDataFromUserID(id, this.activityData); // all activities for user, userRepo is actual repo
    // let userData = this.activityData.filter(data => {
    //   return data.userID === id
    // })
    //return userData.find(data => data.date === date)[dataType];
  }

  calculateActiveAverageForWeek(id, date, userRepo) { //return average active minutes for all users
    if(id < 1 || typeof id !== 'number' || date.length !== 10 || typeof date !== 'string') {
      return undefined
    }
    const weekData = this.getUserWeekData(id, date, 'minutesActive');
    const weeklyAverage = (weekData.reduce((sum, day) => {
      return sum += day.amount
    }, 0) / 7)
    return parseFloat(weeklyAverage.toFixed(1));
    // return `{parseFloat(weeklyAverage.toFixed(1))} minutes active`
    // return parseFloat((userRepo.getWeekFromDate(date, id, this.activityData).reduce((acc, elem) => { //acc and elem are terrible names
    //   return acc += elem.minutesActive;
    // }, 0) / 7).toFixed(1));
  }

  accomplishStepGoal(date, user, dataType) { // returns true if user steps = daily step goal (should be >=)
    // shouldn't need id if we have user
    const stepsToday = this.getUserDataForDay(user.id, date, 'numSteps').amount
    if (stepsToday >= user.dailyStepGoal) {
      return true;
    }
    return false
  }

  getDaysGoalExceeded(id, user) { // returns array of dates user exceeding goal steps
    if (typeof user !== 'object') {return undefined}
    const daysExceeded = this.activityData.filter(data => {
      return user.id === data.userID && data.numSteps > user.dailyStepGoal})
    return daysExceeded.map(data => data.date) || undefined;
  }

  getStairRecord(id) { // returns highest number of stairs user as ever done on single day
    const recordDays = this.activityData.filter(data => id === data.userID);
    return recordDays.reduce((acc, elem) => {
      return (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc}, 0);
    // return this.activityData.filter(data => id === data.userID).reduce((acc, elem) => (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc, 0);
  }
  // end not used methods
  getOveralUserAverage(date, dataType) {
    const dayData = this.activityData.filter(data => data.date === date)
    const average = parseFloat((dayData.reduce((acc, elem) => acc += elem[dataType], 0) / dayData.length).toFixed(1))
    const overallAverage = {};
    overallAverage[`${dataType}`] = average
  }

  getAllUserAverageForDay(date, userRepo, dataType) { //relevent data is string
    const dayData = this.activityData.filter(data => data.date === date)
    const average = parseFloat((dayData.reduce((acc, elem) => acc += elem[dataType], 0) / dayData.length).toFixed(1))
    const overallAverage = {}
    let type = dataType;
    if(dataType === 'numSteps') {
      type = 'steps'
    }
    overallAverage[`${type}`] = average // this is a cleaner object than just the value being returned
    return average;
    // const selectedDayData = this.activityData.filter(data => data.date === date); // userRepo is actual repo
    // return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[dataType], 0) / selectedDayData.length).toFixed(1));
  }

  getUserWeekData(id, date, dataType) {
    let userActivities = this.activityData.filter(data => data.userID === id); //array of only users activities
    const firstIndex = userActivities.findIndex(x => x.date === date); // index of that date's object
    const weekData =  userActivities.slice(firstIndex - 6, firstIndex + 1);
    return weekData.reduce((weekList, day) => { //not being used yet
      let type = dataType;
      if(dataType === 'numSteps') {
        type = 'steps'
      }
      let dayData = {date: day.date, amount: day[dataType], unit: type}
      weekList.unshift(dayData);
      return weekList;
    }, [])
    // should return object with date, unit and unit type
  }

// replace userData with getUserData
  userDataForWeek(id, date, userRepo, dataType) { //return steps over a week for specific user on specific date
    let userActivities = this.activityData.filter(data => data.userID === id); //array of only users activities
    const firstIndex = userActivities.findIndex(x => x.date === date); // index of that date's object
    const weekData =  userActivities.slice(firstIndex - 6, firstIndex + 1);
    return weekData.reduce((week, day) => {
      let string = `${day.date}: ${day[dataType]}`
      week.unshift(string)
      return week
    }, [])

  }


  getStreak(userRepo, id, dataType) { //return 3-day increasing streak for a users step count or active minutes
    let userActivities = this.activityData.filter(data => data.userID === id);
    userActivities = userActivities.sort((a, b) => new Date(a.date) - new Date(b.date));
    let streaks = userActivities.filter((day, i) => {
      if (i >= 2) {
        return userActivities[i - 2][dataType] < userActivities[i - 1][dataType]
        && userActivities[i - 1][dataType] < userActivities[i][dataType]
      }
    });
    return streaks.map(streak => {
      return streak.date;
    })
    // input (userRepo, 1, 'numSteps')
    // let data = this.activityData; // this is redundant
    // let sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse(); //just an array of that users data
  }

  // needs to be moved into activity test from friends test

  // Friends

  getFriendsActivity(user, userRepo) { // returns array of all friends' activities
    let friendsActivities = []
    user.friends.forEach(friendID => {
      friendsActivities.push(...this.activityData.filter(data => {
        return friendID === data.userID
      }))
    })
    return friendsActivities
    // let data = this.activityData;
    // let userDatalist = user.friends.map(function(friend) {
    //   return userRepo.getDataFromUserID(friend, data)
    // });
    // return userDatalist.reduce(function(arraySoFar, listItem) {
    //   return arraySoFar.concat(listItem);
    // }, []);
  }
  getFriendsAverageStepsForWeek(user, date, userRepo) { //returns array with avg steps for each friend
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

    // let friendsActivity = this.getFriendsActivity(user, userRepo);
    // let timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    // return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline)

    // returns [ { '1': 9355.6 }, { '2': 7031.3 } ]
  }

  showChallengeListAndWinner(user, date, userRepo) { // returns users ranked friendslist activity for a chosen week with names
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    return rankedList.map(friend => {
      const userName = userRepo.users.find(user => user.id === friend.id).name
      // let userID = Object.keys(listItem)[0]; // this this is the only way to get key's id
      // let userName = userRepo.getDataFromID(parseInt(friend.id)).name;
      return `${userName}: ${friend.avgSteps}`
    })
  }

  // createChallengeListAndWinner(user, date, userRepo) { // returns users ranked friendslist activity for a chosen week with names
  //   let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
  //   rankedList = rankedList.map(friend => {
  //     const userName = userRepo.users.find(user => user.id === friend.id).name
  //     return {name: userName, avgSteps: friend.avgSteps}
  //   })
  //   return rankedList.sort((a, b) => b.avgSteps - a.avgSteps)
  // }

  showcaseWinner(user, date, userRepo) { // not tested returns winner of steps challenge of friends
    let friendsAverages = this.showChallengeListAndWinner(user, date, userRepo);
    let winner = friendsAverages.shift();
    return winner;
  }

  getWinnerId(user, date, userRepo) { // return ID of the winning friend
    let friends = this.getFriendsAverageStepsForWeek(user, date, userRepo)
    return friends.shift().id
  }
}

export default Activity;
