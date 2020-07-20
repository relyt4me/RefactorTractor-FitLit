import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import userData from './data/users';
import hydrationData from './data/hydration';
import sleepData from './data/sleep';
import activityData from './data/activity';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

var sidebarName = document.getElementById('sidebarName');
var stepGoalCard = document.getElementById('stepGoalCard');
var headerText = document.getElementById('headerText');
var userAddress = document.getElementById('userAddress');
var userEmail = document.getElementById('userEmail');
var userStridelength = document.getElementById('userStridelength');
var friendList = document.getElementById('friendList');
var hydrationToday = document.getElementById('hydrationToday');
var hydrationAverage = document.getElementById('hydrationAverage');
var hydrationThisWeek = document.getElementById('hydrationThisWeek');
var hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
var historicalWeek = document.querySelectorAll('.historicalWeek');
var sleepToday = document.getElementById('sleepToday');
var sleepQualityToday = document.getElementById('sleepQualityToday');
var avUserSleepQuality = document.getElementById('avUserSleepQuality');
var sleepThisWeek = document.getElementById('sleepThisWeek');
var sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
var friendChallengeListToday = document.getElementById('friendChallengeListToday');
var friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
var bigWinner = document.getElementById('bigWinner');
var userStepsToday = document.getElementById('userStepsToday');
var avgStepsToday = document.getElementById('avgStepsToday');
var userStairsToday = document.getElementById('userStairsToday');
var avgStairsToday = document.getElementById('avgStairsToday');
var userMinutesToday = document.getElementById('userMinutesToday');
var avgMinutesToday = document.getElementById('avgMinutesToday');
var userStepsThisWeek = document.getElementById('userStepsThisWeek');
var userStairsThisWeek = document.getElementById('userStairsThisWeek');
var userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
var bestUserSteps = document.getElementById('bestUserSteps');
var streakList = document.getElementById('streakList');
var streakListMinutes = document.getElementById('streakListMinutes');

window.onload = startApp(); //Starts Here (global variables currentInformation = {})

function startApp() {
  let userList = []; // let userRepo = new UserRepo(makeUsers()); next three lines ** here to randomHistory should be a function for instatiating data
  makeUsers(userList);
  let userRepo = new UserRepo(userList);
  let hydrationRepo = new Hydration(hydrationData); // created our hydration class based on (need to get hydration from API)
  let sleepRepo = new Sleep(sleepData); // same as above Sleep
  let activityRepo = new Activity(activityData); // same as above Activity
  var userNowId = pickUser(); // rename currentUser = newRandomUser() (userNowID = currentUser.id)
  let userNow = getUserById(userNowId, userRepo); //covered from above
  let today = makeToday(userRepo, userNowId, hydrationData); // rename mostRecentDate and assign to '2020/01/22' for now and possibly use a method later to get the most recent date
  let randomHistory = makeRandomDate(userRepo, userNowId, hydrationData); // a random date? (do we need this) REMOVE
  historicalWeek.forEach((instance) => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`)); // remove the random week and historical week placements REMOVE
  addInfoToSidebar(userNow, userRepo); // fills out user infor (iteration 1 dashboard)
  addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
  let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}

function makeUsers(array) {
  //rename instatiateUsers remove parameter add line under with returned array
  userData.forEach(function (dataItem) {
    //this is a data file and makes instances of all of the users from the data file in one array
    let user = new User(dataItem); // need to get data file from the API
    array.push(user);
  });
}

function pickUser() {
  return Math.floor(Math.random() * 50); //needs more dynamic if more users
}

function getUserById(id, listRepo) {
  return listRepo.getDataFromID(id);
}

function makeToday(userStorage, id, dataSet) {
  // refactor
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet); // makeSorted orders set by date from recent starting
  return sortedArray[0].date;
}

function makeRandomDate(userStorage, id, dataSet) {
  // gives a random date (used where?)
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet); // sorts data set by date from recent
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date;
}

function addInfoToSidebar(user, userStorage) {
  // populateUserCard
  sidebarName.innerText = user.name; // docQS should be done here
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`; // is not manipulating sidebar (move elsewhere or rename function)
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`; // docQS done here
  avStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`; // not a thing need docQS displays averagestepgoal from userRepo
  userAddress.innerText = user.address; // docQS should be done here
  userEmail.innerText = user.email; // docQS should be done here
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`; // docQS should be done here
  friendList.insertAdjacentHTML(
    // docQS should be done here
    'afterBegin',
    makeFriendHTML(user, userStorage) // rename to userRepo renamed display friendlist
  );
}

function makeFriendHTML(user, userStorage) {
  // gets the HTML for the ul that gets put there
  return user
    .getFriendsNames(userStorage) // an array of strings that are the friends
    .map((friendName) => `<li class='historical-list-listItem'>${friendName}</li>`)
    .join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage);
}

//const addHydrationInfo = () => {};
function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
  // remove laterDate (possibly make single function for hydration and sleep)
  // docQS done here, change the adjacentHTML to just mess with the span
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyOunces(id, dateString)}</span></p><p>oz water today.</p>`);
  // docQS done here, same as above
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageOunces(id)}</span></p> <p>oz per day.</p>`);
  // docQS done here, passes in an array of 'Date: onces' for one week
  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id)));
  // not using below after getting rid of random week
  hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage)));
}

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  // not passing in a method but a week of ounces, Duplicate logic for other make____HTML
  return method.map((drinkData) => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
  // remove laterDateString, need to include quality of sleep in html locations
  // docQS done here, just mess with span
  sleepToday.insertAdjacentHTML('afterBegin', `<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`);
  // docQS done here, just mess with span
  sleepQualityToday.insertAdjacentHTML('afterBegin', `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`);
  // docQS done here,
  avUserSleepQuality.insertAdjacentHTML(
    'afterBegin',
    `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`
  );
  // same notes as above in Hydration
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)));
  sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
}

function makeSleepHTML(id, sleepInfo, userStorage, method) {
  // deal with just the span? has params not used
  return method.map((sleepData) => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

// never called
function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
  return method.map((sleepQualityData) => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  // docQS done here for all of these
  userStairsToday.insertAdjacentHTML('afterBegin', `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`);
  avgStairsToday.insertAdjacentHTML(
    'afterBegin',
    `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`
  );
  userStepsToday.insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`);
  avgStepsToday.insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`);
  userMinutesToday.insertAdjacentHTML(
    'afterBegin',
    `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`
  );
  avgMinutesToday.insertAdjacentHTML(
    'afterBegin',
    `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`
  );
  userStepsThisWeek.insertAdjacentHTML('afterBegin', makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'numSteps')));
  userStairsThisWeek.insertAdjacentHTML('afterBegin', makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'flightsOfStairs')));
  userMinutesThisWeek.insertAdjacentHTML('afterBegin', makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'minutesActive')));
  bestUserSteps.insertAdjacentHTML('afterBegin', makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, 'numSteps')));
}

// All of these are the same method for HTML listing if we send in units (variable should not be method)
function makeStepsHTML(id, activityInfo, userStorage, method) {
  return method.map((activityData) => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {
  return method.map((data) => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {
  return method.map((data) => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
  // docQS done here for all, somewhere in here we are getting a second set which shold be later but we want to remove that rando week
  friendChallengeListToday.insertAdjacentHTML('afterBegin', makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  streakList.insertAdjacentHTML('afterBegin', makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
  streakListMinutes.insertAdjacentHTML('afterBegin', makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML('afterBegin', makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`);
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map((friendChallengeData) => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {
  return method.map((streakData) => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}
