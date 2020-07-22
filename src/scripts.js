import './css/base.scss';
import './css/style.scss';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import User from './User';
import UserRepo from './User-repo';
import Activity from './Activity';
import Sleep from './Sleep';
import Hydration from './Hydration';
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
  hydrationRepo = new Hydration(data.hydrationData); // created our hydration class based on (need to get hydration from API)
  sleepRepo = new Sleep(data.sleepData); // same as above Sleep
  activityRepo = new Activity(data.activityData); // same as above Activity
  currentUser = newRandomUser(); // now in one helper function
}

function populatePage() {
  let mostRecentDate = getUsersRecentDate(currentUser.id, data.hydrationData); // rename mostRecentDate and assign to '2020/01/22' for now and possibly use a method later to get the most recent date
  document.getElementById('greet-user-text').innerText = `${currentUser.getFirstName()}'s Activity Tracker`; // is not manipulating sidebar (move elsewhere or rename function`;
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
  document.getElementById('user-name-header').innerText = currentUser.name;
  document.getElementById('step-goal-card').innerText = `${currentUser.dailyStepGoal} steps/day`;
  document.getElementById('av-step-goal-card').innerText = `(the average user step goal is ${userRepo.calculateAverageStepGoal()}/day)`; // not a thing need docQS displays averagestepgoal from userRepo
  document.getElementById('user-address').innerText = currentUser.address;
  document.getElementById('user-email').innerText = currentUser.email;
  document.getElementById('user-stridelength').innerText = `Stridelength: ${currentUser.strideLength}ft.`;
  document.getElementById('friend-list').insertAdjacentHTML('afterBegin', makeFriendHTML()); // rename to userRepo renamed display friendlist
}

function makeFriendHTML() {
  // gets the HTML for the ul that gets put there
  return currentUser
    .getFriendsNames(data.userData) // an array of strings that are the friends
    .map((friendName) => `<li class='friend-list'>&#128100 ${friendName}</li>`)
    .join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage);
}

function populateHydrationSection(currentDate) {
  // change the adjacentHTML to just mess with the span
  document.getElementById('hydration-today').insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationRepo.calculateDailyOunces(currentUser.id, currentDate)}</span></p><p>oz water today.</p>`);
  document.getElementById('hydration-average').insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationRepo.calculateAverageOunces(currentUser.id)}</span></p> <p>oz per day.</p>`);
  document.getElementById('hydration-this-week').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(hydrationRepo.calculateFirstWeekOunces(userRepo, currentUser.id), 'oz'));
}

// ['2019/4/20 32', '2019/4/20 32', '2019/4/20 32', '2019/4/20 32'] - array format for these functions
function makeArrayIntoHTMLList(arrayData, unit) {
  return arrayData.map((dateAndAmount) => `<li class="friend-list">On ${dateAndAmount}${unit}</li>`).join('');
}

function populateSleepSection(currentDate) {
  // just mess with span
  document.getElementById('sleep-today').insertAdjacentHTML('afterBegin', `<p>You slept</p> <p><span class="number">${sleepRepo.calculateDailySleep(currentUser.id, currentDate)}</span></p> <p>hours today.</p>`);
  // just mess with span
  document.getElementById('sleep-quality-today').insertAdjacentHTML('afterBegin', `<p>Your sleep quality was</p> <p><span class="number">${sleepRepo.calculateDailySleepQuality(currentUser.id, currentDate)}</span></p><p>out of 5.</p>`);
  // just mess with Span
  document.getElementById('av-user-sleep-quality').insertAdjacentHTML('afterBegin', `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepRepo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>`);
  document.getElementById('sleep-this-week').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(sleepRepo.calculateWeekSleep(currentDate, currentUser.id, userRepo), 'hours'));
}

function populateActivitySection(currentDate, winnerId) {
  // UserStairsToday through avgMinutesToday should only affect span
  document.getElementById('user-stairs-today').insertAdjacentHTML('afterBegin', `<p>Stair Count:</p><p>You</><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'flightsOfStairs')}</span></p>`);
  document.getElementById('avg-stairs-today').insertAdjacentHTML('afterBegin', `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'flightsOfStairs')}</span></p>`);
  document.getElementById('user-steps-today').insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'numSteps')}</span></p>`);
  document.getElementById('avg-steps-today').insertAdjacentHTML('afterBegin', `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'numSteps')}</span></p>`);
  document.getElementById('user-minutes-today').insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityRepo.userDataForToday(currentUser.id, currentDate, userRepo, 'minutesActive')}</span></p>`);
  document.getElementById('avg-minutes-today').insertAdjacentHTML('afterBegin', `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUserAverageForDay(currentDate, userRepo, 'minutesActive')}</span></p>`);
  document.getElementById('user-steps-this-week').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(activityRepo.userDataForWeek(currentUser.id, currentDate, userRepo, 'numSteps'), 'steps'));
  document.getElementById('user-stairs-this-week').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(activityRepo.userDataForWeek(currentUser.id, currentDate, userRepo, 'flightsOfStairs'), 'flights'));
  document.getElementById('user-minutes-this-week').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(activityRepo.userDataForWeek(currentUser.id, currentDate, userRepo, 'minutesActive'), 'minutes'));
  document.getElementById('best-user-steps').insertAdjacentHTML('afterBegin', makeArrayIntoHTMLList(activityRepo.userDataForWeek(winnerId, currentDate, userRepo, 'numSteps'), 'steps'));
}

function populateFriendsSection(currentDate) {
  document.getElementById('friend-challenge-list-today').insertAdjacentHTML('afterBegin', makeFriendChallengeHTML(activityRepo.showChallengeListAndWinner(currentUser, currentDate, userRepo)));
  document.getElementById('streak-list').insertAdjacentHTML('afterBegin', makeStepStreakHTML(activityRepo.getStreak(userRepo, currentUser.id, 'numSteps')));
  document.getElementById('streak-list-minutes').insertAdjacentHTML('afterBegin', makeStepStreakHTML(activityRepo.getStreak(userRepo, currentUser.id, 'minutesActive')));
  document.getElementById('big-winner').insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityRepo.showcaseWinner(currentUser, currentDate, userRepo)} steps`);
}

function makeFriendChallengeHTML(arrayData) {
  return arrayData.map((friendChallengeData) => `<li class="friend-list">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(arrayData) {
  return arrayData.map((streakData) => `<li class="friend-list">${streakData}!</li>`).join('');
}
