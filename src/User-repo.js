class UserRepo {
  constructor(users) {
    this.users = users;
  }

  /* User Repo should have two methods:
  - get user data for a given user ID- getDataFromID()
  - get average step goal for all users- calculateAverageStepGoal()
  */ 
  getDataFromID(id) {
    return this.users.find((user) => id === user.id);
  }

  calculateAverageStepGoal() {
    let totalStepGoal = this.users.reduce((sum, data) => {
      sum += data.dailyStepGoal
      return sum
    }, 0);
    return Math.round(totalStepGoal / this.users.length)
  }

  /* 
  Methods that shouldn't be in userRepo below:
  */

  //Used by activity, hyradtion, and sleep and scripts
  // it grabs all of the user data from given data set and given an ID 
  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  }

  //given a user id and data set this sorts the data by date
  // sorts most recent to least recent
  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet)
    let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  }

  /* 
  method doesn't seem very useful since you can just invoke the 
  makeSortedUserArray and get the date of first index
  */
  getToday(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  }

  // This returns the EXACT same thing as makeSortedUserArray()
  // see lins 85-110 of testing file
  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  }

  // returns back the same thing you pass in, see test
  // not sure the use of this 
  getWeekFromDate(date, id, dataSet) {
    let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  }

  // returns data of whatever date and data set you pass in, for all users
  chooseWeekDataForAllUsers(dataSet, date) {
    return dataSet.filter(function(dataItem) {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
    })
  }

  chooseDayDataForAllUsers(dataSet, date) {
    return dataSet.filter(function(dataItem) {
      return dataItem.date === date
    });
  }

  // Has parameters that are not used?
  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
    return listFromMethod.reduce(function(objectSoFar, dataItem) {
      if (!objectSoFar[dataItem.userID]) {
        objectSoFar[dataItem.userID] = [dataItem[relevantData]]
      } else {
        objectSoFar[dataItem.userID].push(dataItem[relevantData])
      }
      return objectSoFar;
    }, {})
  }

  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    return Object.keys(sortedObjectKeys).sort(function(b, a) {
      return (sortedObjectKeys[a].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / sortedObjectKeys[a].length) - (sortedObjectKeys[b].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / sortedObjectKeys[b].length)
    })
  }

  // This method is putting out a long float, needs to be rounded
  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    let rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod)
    return rankedUsersAndAverages.map(function(rankedUser) {
      rankedUser = {
        [rankedUser]: sortedObjectKeys[rankedUser].reduce(
          function(sumSoFar, sleepQualityValue) {
            sumSoFar += sleepQualityValue
            return sumSoFar;
          }, 0) / sortedObjectKeys[rankedUser].length
      }
      return rankedUser;
    })
  }
}

export default UserRepo;
