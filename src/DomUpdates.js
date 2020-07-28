class DomUpdates {
  changeInnerTextID(id, text) {
    document.getElementById(id).innerText = text;
  }

  addActivityHTML(activityRepo, id, user, dataType,) {
    const innerHTML = `<p>3 day streak on: ${activityRepo.getStreak(user.id, dataType)}</p>`
    document.getElementById(id).insertAdjacentHTML('afterEnd', innerHTML)
  }

  populateUserWidget(currentUser, sleepRepo, activityRepo, mostRecentDate) {
    this.changeInnerTextID('user-name-header', currentUser.name);
    this.changeInnerTextID('user-address', currentUser.address);
    this.changeInnerTextID('user-email', currentUser.email);
    this.changeInnerTextID('user-stride-length', currentUser.strideLength);
    this.changeInnerTextID('user-step-goal', currentUser.dailyStepGoal);
    if (activityRepo.accomplishStepGoal(mostRecentDate, currentUser)) {
      this.changeInnerTextID('step-goal-complete', 'Step goal reached today: ✅');
    } else {
      this.changeInnerTextID('step-goal-complete', 'Step goal reached today: 🚫');
    }
    this.changeInnerTextID('days-exceeded-step-goal', activityRepo.getDaysGoalExceeded(currentUser.id, currentUser).length);
    this.changeInnerTextID('user-avg-hr-sleep', sleepRepo.calculateAverageSleep(currentUser.id));
    this.changeInnerTextID('user-avg-qlty-sleep', sleepRepo.calculateAverageSleepQuality(currentUser.id));
    this.changeInnerTextID('user-record-stairs', activityRepo.getStairRecord(currentUser.id));
  }

  populateTodayInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate) {
    this.changeInnerTextID('user-hydration-today', hydrationRepo.calculateDailyOunces(currentUser.id, mostRecentDate));
    this.changeInnerTextID('user-stairs-today',activityRepo.getUserDataForDay(currentUser.id, mostRecentDate, 'flightsOfStairs').amount + ' flights');
    this.changeInnerTextID('user-steps-today', activityRepo.getUserDataForDay(currentUser.id, mostRecentDate, 'numSteps').amount + ' steps');
    this.changeInnerTextID('user-miles-today', activityRepo.getMilesByDate(currentUser.id, mostRecentDate, currentUser) + ' miles');
    this.changeInnerTextID('user-minutes-today', activityRepo.getUserDataForDay(currentUser.id, mostRecentDate, 'minutesActive').amount + ' minutes');
    this.changeInnerTextID('user-sleep-hours-today', sleepRepo.calculateDailySleep(currentUser.id, mostRecentDate));
    this.changeInnerTextID('user-sleep-qlty-today', sleepRepo.calculateDailySleepQuality(currentUser.id, mostRecentDate));
  }

  populateActivityStreaks(activityRepo, user) {
    this.addActivityHTML(activityRepo, 'user-stairs-today', user, 'flightsOfStairs')
    this.addActivityHTML(activityRepo, 'user-miles-today', user, 'numSteps')
    this.addActivityHTML(activityRepo, 'user-minutes-today', user, 'minutesActive')
  }

  populateWeekInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate) {
    this.fillColumn('day', hydrationRepo.getWeekOfOunces(currentUser.id, mostRecentDate), 'date');
    this.fillColumn('h', hydrationRepo.getWeekOfOunces(currentUser.id, mostRecentDate));
    this.fillColumn('u', activityRepo.getUserWeekData(currentUser.id, mostRecentDate, 'flightsOfStairs'));
    this.fillColumn('s', activityRepo.getUserWeekData(currentUser.id, mostRecentDate, 'numSteps'));
    this.fillColumn('m', activityRepo.getUserWeekData(currentUser.id, mostRecentDate, 'minutesActive'));
    let weekOfHours = sleepRepo.getWeekOfHoursSlept(currentUser.id, mostRecentDate);
    let weekOfQuality = sleepRepo.getWeekOfQualitySlept(currentUser.id, mostRecentDate);
    this.fillColumn('z', weekOfHours, 'sleep', weekOfQuality);
  }

  populateLeaderBoard(userRepo, sleepRepo, activityRepo, mostRecentDate, sleepData) {
    this.changeInnerTextID('avg-step-goal', userRepo.calculateAverageStepGoal());
    this.changeInnerTextID('avg-sleep-hours', sleepRepo.calculateAllUserAvgSleepMetric('hoursSlept'));
    this.changeInnerTextID('avg-sleep-qlty', sleepRepo.calculateAllUserAvgSleepMetric('sleepQuality'));
    this.changeInnerTextID('avg-steps-made', activityRepo.getOveralUserAverage(mostRecentDate, 'numSteps').numSteps);
    this.changeInnerTextID('avg-stairs', activityRepo.getOveralUserAverage(mostRecentDate, 'flightsOfStairs').flightsOfStairs);
    this.changeInnerTextID('avg-minutes', activityRepo.getOveralUserAverage(mostRecentDate, 'minutesActive').minutesActive);
    let sleepiestUser = sleepRepo.getSleepWinnerForDay(mostRecentDate, sleepData, userRepo);
    this.changeInnerTextID('most-sleep-today', `${sleepiestUser.user} with ${sleepiestUser.hoursSlept}hrs of sleep`);
    let topSleepers = this.getTopThreeNames(sleepRepo.getUsersWithQualityAbove3(mostRecentDate), userRepo);
    this.changeInnerTextID('best-sleep-this-week', `${topSleepers}`);
  }

  populateFriendsCard(currentUser, userRepo, activityRepo, mostRecentDate) {
    let friends = activityRepo.showChallengeListAndWinner(currentUser, mostRecentDate, userRepo)
    friends[0].steps = `wins with ${friends[0].steps}`
    const friendsListHTML = friends
    .map((friend) => `<li> 👤 ${friend.name} </br>${friend.steps} steps</li>`)
    .join('');
    document.getElementById('friend-list').innerHTML = friendsListHTML;
  }

  fillColumn(columnName, weekInformation, type, secondMetric) {
    let columnCells = [0, 1, 2, 3, 4, 5, 6];
    columnCells = columnCells.map((row) => document.getElementById(`${columnName}-${row}`));
    if (type === 'date') {
      this.fillDays(columnCells, weekInformation);
    } else if (type === 'sleep') {
      this.fillSleep(columnCells, weekInformation, secondMetric);
    } else {
      columnCells.forEach((cell, index) => {
        cell.innerText = `${weekInformation[index].amount} ${weekInformation[index].unit}`;
      });
    }
  }

  fillDays(cells, weekInformation) {
    cells.forEach((cell, index) => {
      const dayOfWeek = this.getStringOfWeekday(weekInformation[index].date);
      cell.innerText = dayOfWeek;
    });
  }

  getStringOfWeekday(string) {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let theDate = new Date(string.split('/').join('-'));
    return weekdays[theDate.getDay()];
  }

  getTopThreeNames(users, userRepo) {
    let threeUsers = users.splice(0, 3).map((user) => {
      return userRepo.getDataFromID(user).name;
    });
    return threeUsers.join(', ');
  }

  fillSleep(cells, weekInformation, secondMetric) {
    cells.forEach((cell, index) => {
      const text = `${weekInformation[index].amount} hours, ${secondMetric[index].amount} ⭐'s`;
      cell.innerText = text;
    });
  }
}

export default DomUpdates;
