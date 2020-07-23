import './css/base.scss';
import './css/style.scss';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import fetchData from './fetchAllData';

const data = {
  userData: null,
  sleepData: null,
  activityData: null,
  hydrationData: null
}

let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;
let currentUser;

window.onload = startApp();

function startApp() {
  fetchData() 
    .then(allData => {
      data.userData = allData.userData;
      data.sleepData = allData.sleepData;
      data.activityData = allData.activityData;
      data.hydrationData = allData.hydrationData;
    }) 
    .then( () => {
      instantiatePageData();
      populatePage();
    })
    .catch(err => console.log(err.message))
}

function instantiatePageData() {
  userRepo = new UserRepo(instantiateUsers());
  hydrationRepo = new Hydration(data.hydrationData);
  sleepRepo = new Sleep(data.sleepData);
  activityRepo = new Activity(data.activityData);
  currentUser = newRandomUser();
}

function populatePage() {
  let mostRecentDate = getUsersRecentDate(currentUser.id, data.hydrationData); // rename mostRecentDate and assign to '2020/01/22' for now and possibly use a method later to get the most recent date
  document.getElementById('headerText').innerText = `${currentUser.getFirstName()}'s Activity Tracker`; // is not manipulating sidebar (move elsewhere or rename function`;
  populateUserWidget(); // fills out user infor (iteration 1 dashboard)
  populateHydrationSection(mostRecentDate);
  populateSleepSection(mostRecentDate);
  let winnerNow = makeWinnerID(activityRepo, currentUser, mostRecentDate, userRepo);
  populateActivitySection(mostRecentDate, winnerNow);
  populateFriendsSection(mostRecentDate);
}

function instantiateUsers() {
  const allUsers = data.userData.map((user) => {
    //this is a data file and makes instances of all of the users from the data file in one array
    return new User(user); // need to get data file from the API
  });
  return allUsers;
}

// grabs a random instatiated user from the userRepo global variable
function newRandomUser() {
  const randomID = Math.floor(Math.random() * userRepo.users.length);
  return userRepo.getDataFromID(randomID);
}

// function will remove userRepo functionality from the class returns the most current date of a data set for a given user
function getUsersRecentDate(id, dataSet) {
  const dataFromID = dataSet.filter((userInstance) => id === userInstance.userID);
  const sortedByDate = dataFromID.sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedByDate[0].date;
}

//************remove after getting rid of in other functionality
// function makeRandomDate(userStorage, id, dataSet) {
//   // gives a random date (used where?)
//   var sortedArray = userStorage.makeSortedUserArray(id, dataSet); // sorts data set by date from recent
//   return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date;
// }

function populateUserWidget() {
  document.getElementById('sidebarName').innerText = currentUser.name;
  document.getElementById('stepGoalCard').innerText = `Your daily step goal is ${currentUser.dailyStepGoal}.`;
  document.getElementById('avStepGoalCard').innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`; // not a thing need docQS displays averagestepgoal from userRepo
  document.getElementById('userAddress').innerText = currentUser.address;
  document.getElementById('userEmail').innerText = currentUser.email;
  document.getElementById('userStridelength').innerText = `Your stridelength is ${currentUser.strideLength} meters.`;
  document.getElementById('friendList').insertAdjacentHTML('afterBegin', makeFriendHTML()); // rename to userRepo renamed display friendlist
}

function makeFriendHTML() {
  // gets the HTML for the ul that gets put there
  return currentUser
    .getFriendsNames(data.userData) // an array of strings that are the friends
    .map((friendName) => `<li class='historical-list-listItem'>${friendName}</li>`)
    .join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage);
}

function populateHydrationSection(currentDate) {
  // change the adjacentHTML to just mess with the span
  document.getElementById('hydrationToday').insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationRepo.calculateDailyOunces(currentUser.id, currentDate)}</span></p><p>oz water today.</p>`);
  document.getElementById('hydrationAverage').insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationRepo.calculateAverageOunces(currentUser.id)}</span></p> <p>oz per day.</p>`);
  document.getElementById('hydrationThisWeek').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(hydrationRepo.getWeekOfOunces(currentUser.id, currentDate), 'oz'));
}

function populateSleepSection(currentDate) {
  // just mess with span
  document.getElementById('sleepToday').insertAdjacentHTML('afterBegin', `<p>You slept</p> <p><span class="number">${sleepRepo.calculateDailySleep(currentUser.id, currentDate)}</span></p> <p>hours today.</p>`);
  // just mess with span
  document.getElementById('sleepQualityToday').insertAdjacentHTML('afterBegin', `<p>Your sleep quality was</p> <p><span class="number">${sleepRepo.calculateDailySleepQuality(currentUser.id, currentDate)}</span></p><p>out of 5.</p>`);
  // just mess with Span
  document.getElementById('avUserSleepQuality').insertAdjacentHTML('afterBegin', `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepRepo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`);
  document.getElementById('sleepThisWeek').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(sleepRepo.getWeekOfHoursSlept(currentUser.id, currentDate), 'hours'));
  document.getElementById('sleep-quality-week').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(sleepRepo.getWeekOfQualitySlept(currentUser.id, currentDate), 'out of 5'));
}

// ['2019/4/20 32', '2019/4/20 32', '2019/4/20 32', '2019/4/20 32'] - array format for these functions
function makeArrayIntoHTMLList(arrayData, unit) {
  return arrayData.map((dateAndAmount) => `<li class="historical-list-listItem">On ${dateAndAmount.date} ${dateAndAmount.amount} ${unit}</li>`).join('');
}

function populateActivitySection(currentDate, winnerId) {
  // UserStairsToday through avgMinutesToday should only affect span
  document.getElementById('userStairsToday').insertAdjacentHTML('afterBegin', `<p>Stair Count:</p><p>You</><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'flightsOfStairs')}</span></p>`);
  document.getElementById('avgStairsToday').insertAdjacentHTML('afterBegin', `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'flightsOfStairs')}</span></p>`);
  document.getElementById('userStepsToday').insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'numSteps')}</span></p>`);
  document.getElementById('avgStepsToday').insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'numSteps')}</span></p>`);
  document.getElementById('userMinutesToday').insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'minutesActive')}</span></p>`);
  document.getElementById('avgMinutesToday').insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'minutesActive')}</span></p>`);
  document.getElementById('userStepsThisWeek').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'numSteps'), 'steps'));
  document.getElementById('userStairsThisWeek').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'flightsOfStairs'), 'flights'));
  document.getElementById('userMinutesThisWeek').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(activityRepo.getUserWeekData(currentUser.id, currentDate, 'minutesActive'), 'minutes'));
  document.getElementById('bestUserSteps').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(activityRepo.getUserWeekData(winnerId, currentDate, 'numSteps'), 'steps'));
}

function populateFriendsSection(currentDate) {
  document.getElementById('friendChallengeListToday').insertAdjacentHTML('afterBegin', makeFriendChallengeHTML(activityRepo.showChallengeListAndWinner(currentUser, currentDate, userRepo)));
  document.getElementById('streakList').insertAdjacentHTML('afterBegin', makeStepStreakHTML(activityRepo.getStreak(userRepo, currentUser.id, 'numSteps')));
  document.getElementById('streakListMinutes').insertAdjacentHTML('afterBegin', makeStepStreakHTML(activityRepo.getStreak(userRepo, currentUser.id, 'minutesActive')));
  document.getElementById('bigWinner').insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityRepo.showcaseWinner(currentUser, currentDate, userRepo)} steps`);
}

function makeFriendChallengeHTML(arrayData) {
  return arrayData.map((friendChallengeData) => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(arrayData) {
  return arrayData.map((streakData) => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}
