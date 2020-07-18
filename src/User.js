// User Class reresents a single user

class User {
  constructor(userDetails) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.address = userDetails.address;
    this.email = userDetails.email;
    this.strideLength = userDetails.strideLength;
    this.dailyStepGoal = userDetails.dailyStepGoal;
    this.friends = userDetails.friends;
  }

  /*
  User Repo should have 1 method:
    - Return just the first name of the user 
        - for displaying it on DOM later
  */
  getFirstName() {
    return this.name.split(' ', 1).join();
  }

  // getNamesOfFriends()
  getFriendsNames(userStorage) {
    return this.friends.map((friendId) => (userStorage.getDataFromID(friendId).name));
  }
}

export default User;
