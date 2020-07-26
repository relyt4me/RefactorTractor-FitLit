class DomUpdates {
  changeInnerTextID(id, text) {
    document.getElementById(id).innerText = text;
  }

  populateUserWidget(currentUser, data, userRepo, sleepRepo, activityRepo, mostRecentDate) {
    this.changeInnerTextID('user-name-header', currentUser.name);
    this.changeInnerTextID('user-address', currentUser.address);
    this.changeInnerTextID('user-email', currentUser.email);
    this.changeInnerTextID('user-stride-length', currentUser.strideLength);
    this.changeInnerTextID('user-step-goal', currentUser.dailyStepGoal);
    if (activityRepo.accomplishStepGoal(mostRecentDate, currentUser)) {
      this.changeInnerTextID('step-goal-complete', '✅');
    } else {
      this.changeInnerTextID('step-goal-complete', '🚫');
    }
    // NEED TO CHECK ON THIS FURTHER ****
    this.changeInnerTextID('days-exceeded-step-goal', activityRepo.getDaysGoalExceeded(currentUser.id, currentUser).length);
    this.changeInnerTextID('user-avg-hr-sleep', sleepRepo.calculateAverageSleep(currentUser.id));
    this.changeInnerTextID('user-avg-qlty-sleep', sleepRepo.calculateAverageSleepQuality(currentUser.id));
    // NEED TO CHECK ON THIS FURTHER *****
    this.changeInnerTextID('user-record-stairs', activityRepo.getStairRecord(currentUser.id));

    // document.getElementById('stepGoalCard').innerText = `Your daily step goal is ${currentUser.dailyStepGoal}.`;
    // document.getElementById('avStepGoalCard').innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`; // not a thing need docQS displays averagestepgoal from userRepo
    // document.getElementById('userStridelength').innerText = `Your stridelength is ${currentUser.strideLength} meters.`;
    // document.getElementById('friendList').insertAdjacentHTML('afterBegin', this.makeFriendHTML(currentUser, data)); // rename to userRepo renamed display friendlist
  }

  populateTodayInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate) {
    this.changeInnerTextID('user-hydration-today', hydrationRepo.calculateDailyOunces(currentUser.id, mostRecentDate));
    this.changeInnerTextID('user-stairs-today', activityRepo.getUserDataForDay(currentUser.id, mostRecentDate, 'flightsOfStairs').amount);
    this.changeInnerTextID('user-steps-today', activityRepo.getUserDataForDay(currentUser.id, mostRecentDate, 'numSteps').amount);
    this.changeInnerTextID('user-miles-today', activityRepo.getMilesByDate(currentUser.id, mostRecentDate, currentUser));
    this.changeInnerTextID('user-minutes-today', activityRepo.getUserDataForDay(currentUser.id, mostRecentDate, 'minutesActive').amount);
    this.changeInnerTextID('user-sleep-hours-today', sleepRepo.calculateDailySleep(currentUser.id, mostRecentDate));
    this.changeInnerTextID('user-sleep-qlty-today', sleepRepo.calculateDailySleepQuality(currentUser.id, mostRecentDate));
  }

  populateWeekInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate) {
    this.fillColumn('day', hydrationRepo.getWeekOfOunces(currentUser.id, mostRecentDate), true);
    this.fillColumn('h', hydrationRepo.getWeekOfOunces(currentUser.id, mostRecentDate));
    this.fillColumn('u', activityRepo.getUserWeekData(currentUser.id, mostRecentDate, 'flightsOfStairs'));
    this.fillColumn('s', activityRepo.getUserWeekData(currentUser.id, mostRecentDate, 'numSteps'));
    this.fillColumn('m', activityRepo.getUserWeekData(currentUser.id, mostRecentDate, 'minutesActive'));
    this.fillColumn('z', sleepRepo.getWeekOfHoursSlept(currentUser.id, mostRecentDate));
  }

  fillColumn(columnName, weekInformation, isDate) {
    let columnCells = [0, 1, 2, 3, 4, 5, 6];
    columnCells = columnCells.map((row) => document.getElementById(`${columnName}-${row}`));
    if (isDate) {
      this.fillDays(columnCells, weekInformation);
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

  populateFriendsCard(currentUser, userRepo) {
    const friendsListHTML = currentUser
      .getFriendsNames(userRepo.users)
      .map((friendName) => `<li> 👤 ${friendName}</li>`)
      .join('');
    document.getElementById('friend-list').innerHTML = friendsListHTML;
    // document.getElementById('friendChallengeListToday').insertAdjacentHTML('afterBegin', this.makeFriendChallengeHTML(activityRepo.showChallengeListAndWinner(currentUser, currentDate, userRepo)));
    // document.getElementById('streakList').insertAdjacentHTML('afterBegin', this.makeStepStreakHTML(activityRepo.getStreak(userRepo, currentUser.id, 'numSteps')));
    // document.getElementById('streakListMinutes').insertAdjacentHTML('afterBegin', this.makeStepStreakHTML(activityRepo.getStreak(userRepo, currentUser.id, 'minutesActive')));
    // document.getElementById('bigWinner').insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityRepo.showcaseWinner(currentUser, currentDate, userRepo)} steps`);
  }

  populateLeaderBoard(userRepo, sleepRepo, hydrationRepo, activityRepo, mostRecentDate) {
    this.changeInnerTextID('avg-step-goal', userRepo.calculateAverageStepGoal());
    this.changeInnerTextID('avg-sleep-hours', sleepRepo.calculateAllUserAvgSleepMetric('hoursSlept'));
    this.changeInnerTextID('avg-sleep-qlty', sleepRepo.calculateAllUserAvgSleepMetric('sleepQuality'));
    this.changeInnerTextID('avg-steps-made', activityRepo.getOveralUserAverage(mostRecentDate, 'numSteps').numSteps);
    this.changeInnerTextID('avg-stairs', activityRepo.getOveralUserAverage(mostRecentDate, 'flightsOfStairs').flightsOfStairs);
    this.changeInnerTextID('avg-minutes', activityRepo.getOveralUserAverage(mostRecentDate, 'minutesActive').minutesActive);
    // It's not returning anything
    //JORDY is method getOveralUserAverage(data, dataType) incomplete
    // When the data is getting into my getSleepWinners for day at some point in the loops a userID does not match the repo or something
    // this.changeInnerTextID('most-sleep-today', this.changeIDsToNames(userRepo, sleepRepo.getSleepWinnerForDay(mostRecentDate)));
  }

  // changeIDsToNames(userRepo, ids) {
  //   console.log(ids);
  //   // return ids
  //   //   .map((id) => {
  //   //     return userRepo.getDataFromID(id).name;
  //   //   })
  //   //   .join(' ');
  // }

  // makeFriendHTML(currentUser, data) {
  //   // gets the HTML for the ul that gets put there
  //   return currentUser
  //     .getFriendsNames(data.userData) // an array of strings that are the friends
  //     .map((friendName) => `<li>${friendName}</li>`)
  //     .join('');
  // }

  // populateHydrationSection(currentDate, hydrationRepo, currentUser) {
  //   // change the adjacentHTML to just mess with the span
  //   document.getElementById('hydrationToday').insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationRepo.calculateDailyOunces(currentUser.id, currentDate)}</span></p><p>oz water today.</p>`);
  //   document.getElementById('hydrationAverage').insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationRepo.calculateAverageOunces(currentUser.id)}</span></p> <p>oz per day.</p>`);
  //   document.getElementById('hydrationThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(hydrationRepo.getWeekOfOunces(currentUser.id, currentDate), 'oz'));
  // }

  // populateSleepSection(currentDate, currentUser, sleepRepo) {
  //   // just mess with span
  //   document.getElementById('sleepToday').insertAdjacentHTML('afterBegin', `<p>You slept</p> <p><span class="number">${sleepRepo.calculateDailySleep(currentUser.id, currentDate)}</span></p> <p>hours today.</p>`);
  //   // just mess with span
  //   document.getElementById('sleepQualityToday').insertAdjacentHTML('afterBegin', `<p>Your sleep quality was</p> <p><span class="number">${sleepRepo.calculateDailySleepQuality(currentUser.id, currentDate)}</span></p><p>out of 5.</p>`);
  //   // just mess with Span
  //   document.getElementById('avUserSleepQuality').insertAdjacentHTML('afterBegin', `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepRepo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`);
  //   document.getElementById('sleepThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(sleepRepo.getWeekOfHoursSlept(currentUser.id, currentDate), 'hours'));
  //   document.getElementById('sleep-quality-week').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(sleepRepo.getWeekOfQualitySlept(currentUser.id, currentDate), 'out of 5'));
  // }

  // populateActivitySection(currentDate, winnerId, currentUser, activityRepo, userRepo) {
  //   // UserStairsToday through avgMinutesToday should only affect span
  //   document.getElementById('userStairsToday').insertAdjacentHTML('afterBegin', `<p>Stair Count:</p><p>You</><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'flightsOfStairs')}</span></p>`);
  //   document.getElementById('avgStairsToday').insertAdjacentHTML('afterBegin', `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'flightsOfStairs')}</span></p>`);
  //   document.getElementById('userStepsToday').insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'numSteps')}</span></p>`);
  //   document.getElementById('avgStepsToday').insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'numSteps')}</span></p>`);
  //   document.getElementById('userMinutesToday').insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'minutesActive')}</span></p>`);
  //   document.getElementById('avgMinutesToday').insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'minutesActive')}</span></p>`);
  //   document.getElementById('userStepsThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'numSteps'), 'steps'));
  //   document.getElementById('userStairsThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'flightsOfStairs'), 'flights'));
  //   document.getElementById('userMinutesThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'minutesActive'), 'minutes'));
  //   document.getElementById('bestUserSteps').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(activityRepo.getUserWeekData(winnerId, currentDate, 'numSteps'), 'steps'));
  // }

  // makeArrayIntoHTMLList(arrayData, unit) {
  //   return arrayData.map((dateAndAmount) => `<li class="historical-list-listItem">On ${dateAndAmount.date} ${dateAndAmount.amount} ${unit}</li>`).join('');
  // }

  // makeFriendChallengeHTML(arrayData) {
  //   return arrayData.map((friendChallengeData) => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  // }

  // makeStepStreakHTML(arrayData) {
  //   return arrayData.map((streakData) => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  // }
}

export default DomUpdates;
