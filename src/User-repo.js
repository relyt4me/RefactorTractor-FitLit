class UserRepo {
  constructor(users) {
    this.users = users;
  }

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
}

export default UserRepo;