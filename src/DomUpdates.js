class DomUpdates {

  populateUserWidget(currentUser, data, userRepo) {
    document.getElementById('sidebarName').innerText = currentUser.name;
    document.getElementById('stepGoalCard').innerText = `Your daily step goal is ${currentUser.dailyStepGoal}.`;
    document.getElementById('avStepGoalCard').innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`; // not a thing need docQS displays averagestepgoal from userRepo
    document.getElementById('userAddress').innerText = currentUser.address;
    document.getElementById('userEmail').innerText = currentUser.email;
    document.getElementById('userStridelength').innerText = `Your stridelength is ${currentUser.strideLength} meters.`;
    document.getElementById('friendList').insertAdjacentHTML('afterBegin', this.makeFriendHTML(currentUser, data)); // rename to userRepo renamed display friendlist
  }

  makeFriendHTML(currentUser, data) {
    // gets the HTML for the ul that gets put there
    return currentUser
      .getFriendsNames(data.userData) // an array of strings that are the friends
      .map((friendName) => `<li class='historical-list-listItem'>${friendName}</li>`)
      .join('');
  }

  populateHydrationSection(currentDate, hydrationRepo, currentUser) {
    // change the adjacentHTML to just mess with the span
    document.getElementById('hydrationToday').insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationRepo.calculateDailyOunces(currentUser.id, currentDate)}</span></p><p>oz water today.</p>`);
    document.getElementById('hydrationAverage').insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationRepo.calculateAverageOunces(currentUser.id)}</span></p> <p>oz per day.</p>`);
    document.getElementById('hydrationThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(hydrationRepo.getWeekOfOunces(currentUser.id, currentDate), 'oz'));
  }

  populateSleepSection(currentDate, currentUser, sleepRepo) {
    // just mess with span
    document.getElementById('sleepToday').insertAdjacentHTML('afterBegin', `<p>You slept</p> <p><span class="number">${sleepRepo.calculateDailySleep(currentUser.id, currentDate)}</span></p> <p>hours today.</p>`);
    // just mess with span
    document.getElementById('sleepQualityToday').insertAdjacentHTML('afterBegin', `<p>Your sleep quality was</p> <p><span class="number">${sleepRepo.calculateDailySleepQuality(currentUser.id, currentDate)}</span></p><p>out of 5.</p>`);
    // just mess with Span
    document.getElementById('avUserSleepQuality').insertAdjacentHTML('afterBegin', `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepRepo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`);
    document.getElementById('sleepThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(sleepRepo.getWeekOfHoursSlept(currentUser.id, currentDate), 'hours'));
    document.getElementById('sleep-quality-week').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(sleepRepo.getWeekOfQualitySlept(currentUser.id, currentDate), 'out of 5'));
  }

  populateActivitySection(currentDate, winnerId, currentUser, activityRepo, userRepo) {
    // UserStairsToday through avgMinutesToday should only affect span
    document.getElementById('userStairsToday').insertAdjacentHTML('afterBegin', `<p>Stair Count:</p><p>You</><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'flightsOfStairs')}</span></p>`);
    document.getElementById('avgStairsToday').insertAdjacentHTML('afterBegin', `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'flightsOfStairs')}</span></p>`);
    document.getElementById('userStepsToday').insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'numSteps')}</span></p>`);
    document.getElementById('avgStepsToday').insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'numSteps')}</span></p>`);
    document.getElementById('userMinutesToday').insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'minutesActive')}</span></p>`);
    document.getElementById('avgMinutesToday').insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'minutesActive')}</span></p>`);
    document.getElementById('userStepsThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'numSteps'), 'steps'));
    document.getElementById('userStairsThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'flightsOfStairs'), 'flights'));
    document.getElementById('userMinutesThisWeek').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'minutesActive'), 'minutes'));
    document.getElementById('bestUserSteps').insertAdjacentHTML('afterBegin', this.makeArrayIntoHTMLList(activityRepo.getUserWeekData(winnerId, currentDate, 'numSteps'), 'steps'));
  }

  makeArrayIntoHTMLList(arrayData, unit) {
    return arrayData.map((dateAndAmount) => `<li class="historical-list-listItem">On ${dateAndAmount.date} ${dateAndAmount.amount} ${unit}</li>`).join('');
  }

  populateFriendsSection(currentDate, currentUser, activityRepo, userRepo) {
    document.getElementById('friendChallengeListToday').insertAdjacentHTML('afterBegin', this.makeFriendChallengeHTML(activityRepo.showChallengeListAndWinner(currentUser, currentDate, userRepo)));
    document.getElementById('streakList').insertAdjacentHTML('afterBegin', this.makeStepStreakHTML(activityRepo.getStreak(userRepo, currentUser.id, 'numSteps')));
    document.getElementById('streakListMinutes').insertAdjacentHTML('afterBegin', this.makeStepStreakHTML(activityRepo.getStreak(userRepo, currentUser.id, 'minutesActive')));
    document.getElementById('bigWinner').insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityRepo.showcaseWinner(currentUser, currentDate, userRepo)} steps`);
  }
  
  makeFriendChallengeHTML(arrayData) {
    return arrayData.map((friendChallengeData) => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  }
  
  makeStepStreakHTML(arrayData) {
    return arrayData.map((streakData) => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
  }
}

export default DomUpdates;