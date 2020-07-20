// userRepo is used as parameter for individual user or whole userRepo
// dataType string which determines which type of date to accesse


class Activity { //should probably be renamed
  constructor(activityData) { //constructor sucks but has to stay
    this.activityData = activityData //
  }
  //// begin uneeded methods
  // getMilesFromStepsByDate(id, date, userRepo) {
  //   // THIS IS NEVER USED
  //    //returns miles walked on a specific date
  //   let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date); //user data that corresponds to user and input date
  //   return parseFloat(((userStepsByDate.numSteps * userRepo.strideLength) / 5280).toFixed(1)); //how is userRepo.strideLength even being accessed?
  //   // userRepo is array of user objects but how does that have a strideLength property?
  //   // userRepo is improperly named
  // }
  // // not used
  // getActiveMinutesByDate(id, date) { //return total minues active on a date for a specific user
  //   let userActivityByDate = this.activityData.find(data => id === data.userID && date === data.date);
  //   return userActivityByDate.minutesActive;
  // }
  // calculateActiveAverageForWeek(id, date, userRepo) { //return average active minutes for all users
  //   return parseFloat((userRepo.getWeekFromDate(date, id, this.activityData).reduce((acc, elem) => { //acc and elem are terrible names
  //     return acc += elem.minutesActive;
  //   }, 0) / 7).toFixed(1));
  // }
  // accomplishStepGoal(id, date, userRepo) { // returns true if user steps = daily step goal (should be >=)
  //   let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
  //   if (userStepsByDate.numSteps === userRepo.dailyStepGoal) { //>= not ===
  //     return true;
  //   }
  //   return false
  // }
  // getDaysGoalExceeded(id, userRepo) { // returns array of dates user exceeding goal steps
  //   return this.activityData.filter(data => id === data.userID && data.numSteps > userRepo.dailyStepGoal).map(data => data.date);
  // }
  // getStairRecord(id) { // returns highest number of stairs user as ever done on single day
  //   return this.activityData.filter(data => id === data.userID).reduce((acc, elem) => (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc, 0);
  // }
  //// end not needed methods
  getAllUserAverageForDay(date, userRepo, dataType) { //relevent data is string
    let selectedDayData = userRepo.chooseDayDataForAllUsers(this.activityData, date); // userRepo is actual repo
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[dataType], 0) / selectedDayData.length).toFixed(1));
  }
  userDataForToday(id, date, userRepo, dataType) { //return steps for specific user on specific date
    let userData = userRepo.getDataFromUserID(id, this.activityData); //userData is actual repo
    return userData.find(data => data.date === date)[dataType];
  }
  userDataForWeek(id, date, userRepo, releventData) { //return steps over a week for specific user on specific date
    return userRepo.getWeekFromDate(date, id, this.activityData).map((data) => `${data.date}: ${data[releventData]}`); //userRepo is actual repo
  }

  // Friends

  getFriendsActivity(user, userRepo) { // returns array of all friends' activities
    let data = this.activityData;
    let userDatalist = user.friends.map(function(friend) {
      return userRepo.getDataFromUserID(friend, data)
    });
    return userDatalist.reduce(function(arraySoFar, listItem) {
      return arraySoFar.concat(listItem);
    }, []);
  }
  getFriendsAverageStepsForWeek(user, date, userRepo) { //returns array with avg steps for each friend
    let friendsActivity = this.getFriendsActivity(user, userRepo);
    let timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline)
  }
  showChallengeListAndWinner(user, date, userRepo) { // returns users ranked friendslist activity for a chosen week with names
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);

    return rankedList.map(function(listItem) {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getDataFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`
    })
  }
  showcaseWinner(user, date, userRepo) { // not tested returns winner of steps challenge of friends
    let namedList = this.showChallengeListAndWinner(user, date, userRepo);
    let winner = this.showChallengeListAndWinner(user, date, userRepo).shift();
    return winner;
  }

  getStreak(userRepo, id, dataType) { //return 3-day increasing streak for a users step count or active minutes
    let data = this.activityData; // this is redundant
    let sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    let streaks = sortedUserArray.filter(function(element, index) {
      if (index >= 2) {
        return (sortedUserArray[index - 2][dataType] < sortedUserArray[index - 1][dataType] && sortedUserArray[index - 1][dataType] < sortedUserArray[index][dataType])
      }
    });
    return streaks.map(function(streak) {
      return streak.date;
    })
  }
  getWinnerId(user, date, userRepo) { // return ID of the winning friend
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let keysList = rankedList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''))
  }
}



export default Activity;
