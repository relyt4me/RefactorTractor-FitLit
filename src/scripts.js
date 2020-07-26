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
import DomUpdates from './DomUpdates';
import postAllUserData from './postAllUserData';

const postButton = document.getElementById('post-button');
const data = {
  userData: null,
  sleepData: null,
  activityData: null,
  hydrationData: null,
};


let userRepo, hydrationRepo, sleepRepo, activityRepo, currentUser, domUpdate;

window.onload = startApp();
postButton.addEventListener('click', postUserInputs)

function startApp() {
  fetchData()
    .then((allData) => {
      data.userData = allData.userData;
      data.sleepData = allData.sleepData;
      data.activityData = allData.activityData;
      data.hydrationData = allData.hydrationData;
    })
    .then(() => {
      instantiatePageData();
      populatePage();
    })
    .catch((err) => console.log(err.message));
}

function instantiatePageData() {
  userRepo = new UserRepo(instantiateUsers());
  hydrationRepo = new Hydration(data.hydrationData);
  sleepRepo = new Sleep(data.sleepData);
  activityRepo = new Activity(data.activityData);
  currentUser = newRandomUser();
  domUpdate = new DomUpdates();
}

function instantiateUsers() {
  const allUsers = data.userData.map((user) => {
    return new User(user);
  });
  return allUsers;
}

// grabs a random instatiated user from the userRepo global variable
function newRandomUser() {
  const randomID = Math.floor(Math.random() * userRepo.users.length);
  return userRepo.getDataFromID(randomID);
}

function populatePage() {
  let mostRecentDate = getUsersRecentDate(currentUser.id, data.hydrationData); // rename mostRecentDate and assign to '2020/01/22' for now and possibly use a method later to get the most recent date
  document.getElementById('greet-user-text').innerText = `${currentUser.getFirstName()}'s Activity Tracker`; // is not manipulating sidebar (move elsewhere or rename function`;
  domUpdate.populateUserWidget(currentUser, sleepRepo, activityRepo, mostRecentDate); // fills out user infor (iteration 1 dashboard)
  domUpdate.populateTodayInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate);
  domUpdate.populateWeekInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate);
  // domUpdate.populateHydrationSection(mostRecentDate, hydrationRepo, currentUser);
  // domUpdate.populateSleepSection(mostRecentDate, currentUser, sleepRepo);
  // let winnerNow = makeWinnerID(activityRepo, currentUser, mostRecentDate, userRepo);
  // domUpdate.populateActivitySection(mostRecentDate, winnerNow, currentUser, activityRepo, userRepo);
  domUpdate.populateFriendsCard(currentUser, userRepo);
  domUpdate.populateLeaderBoard(userRepo, sleepRepo, activityRepo, mostRecentDate, data.sleepData);
}

// function will remove userRepo functionality from the class returns the most current date of a data set for a given user
function getUsersRecentDate(id, dataSet) {
  const dataFromID = dataSet.filter((userInstance) => id === userInstance.userID);
  const sortedByDate = dataFromID.sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedByDate[0].date;
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage);
}

function postUserInputs(event) {
  event.preventDefault();
  let userDate = document.getElementById('date').value || "1941/12/07";
  userDate = userDate.replace(/-/g, '/')
  const userSleepData = getUserSleepData(userDate);
  const userActivityData = getUserActivityData(userDate);
  const userHydrationData = getUserHydrationData(userDate);
  // console.log(userSleepData, userActivityData, userHydrationData)
  // postAllUserData posts information to servers, make sure everything looks good
  // before uncommenting function and posting
  // postAllUserData(userSleepData, userActivityData, userHydrationData)
}

function getUserSleepData(userDate) {
  const userSleepHours = document.getElementById('sleep-input-hrs').value || 0;
  const userSleepQuality = document.getElementById('sleep-input-qlty').value || 0;
  return { "userID": currentUser.id,
    "date": userDate,
    "hoursSlept": parseFloat(userSleepHours),
    "sleepQuality": parseFloat(userSleepQuality)
  }
}

function getUserActivityData(userDate) {
  const userNumSteps = document.getElementById('activity-input-steps').value || 0;
  const userActiveMins = document.getElementById('activity-input-min').value || 0;
  const userFlightsStairs = document.getElementById('activity-input-stairs').value || 0;
  return { "userID": currentUser.id,
    "date": userDate,
    "numSteps": parseFloat(userNumSteps),
    "minutesActive": parseFloat(userActiveMins),
    "flightsOfStairs": parseFloat(userFlightsStairs)
  }
}

function getUserHydrationData(userDate) {
  const userHydration = document.getElementById('hydration-input').value || 0;
  return { "userID": currentUser.id,
    "date": userDate,
    "numOunces": parseFloat(userHydration)
  }
}
