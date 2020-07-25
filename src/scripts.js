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

const data = {
  userData: null,
  sleepData: null,
  activityData: null,
  hydrationData: null,
};

let userRepo, hydrationRepo, sleepRepo, activityRepo, currentUser, domUpdate;

window.onload = startApp();

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
  domUpdate.populateUserWidget(currentUser, data, userRepo, sleepRepo, activityRepo, mostRecentDate); // fills out user infor (iteration 1 dashboard)
  domUpdate.populateTodayInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate);
  domUpdate.populateWeekInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate);
  // domUpdate.populateHydrationSection(mostRecentDate, hydrationRepo, currentUser);
  // domUpdate.populateSleepSection(mostRecentDate, currentUser, sleepRepo);
  // let winnerNow = makeWinnerID(activityRepo, currentUser, mostRecentDate, userRepo);
  // domUpdate.populateActivitySection(mostRecentDate, winnerNow, currentUser, activityRepo, userRepo);
  domUpdate.populateFriendsCard(currentUser, userRepo);
  domUpdate.populateLeaderBoard(userRepo, sleepRepo, hydrationRepo, activityRepo, mostRecentDate);
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
