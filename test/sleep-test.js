import { expect } from 'chai';

import sleepSampleData from './sampleData/sleepSampleData';
import Sleep from '../src/Sleep';
// import UserRepo from '../src/User-repo';
// import User from '../src/User';

describe.only('Sleep', function () {
  // let sleepData;
  // let sleep;
  // let user1;
  // let user2;
  // let user3;
  // let user4;
  // let user5;
  // let users;
  // let userRepo;
  let sleepRepo;

  beforeEach(function () {
    sleepRepo = new Sleep(sleepSampleData);
    // sleepData = [
    //   {
    //     userID: 1,
    //     date: '2017/06/15',
    //     hoursSlept: 6.1,
    //     sleepQuality: 2.2,
    //   },
    //   {
    //     userID: 2,
    //     date: '2017/06/15',
    //     hoursSlept: 7,
    //     sleepQuality: 4.7,
    //   },
    //   {
    //     userID: 3,
    //     date: '2017/06/15',
    //     hoursSlept: 2,
    //     sleepQuality: 3,
    //   },
    //   {
    //     userID: 4,
    //     date: '2017/06/15',
    //     hoursSlept: 5.4,
    //     sleepQuality: 3,
    //   },
    //   {
    //     userID: 1,
    //     date: '2018/07/15',
    //     hoursSlept: 4.1,
    //     sleepQuality: 3.6,
    //   },
    //   {
    //     userID: 2,
    //     date: '2018/07/15',
    //     hoursSlept: 9.6,
    //     sleepQuality: 2.9,
    //   },
    //   {
    //     userID: 3,
    //     date: '2018/07/15',
    //     hoursSlept: 2,
    //     sleepQuality: 3,
    //   },
    //   {
    //     userID: 4,
    //     date: '2018/07/23',
    //     hoursSlept: 8.1,
    //     sleepQuality: 3.5,
    //   },
    //   {
    //     userID: 1,
    //     date: '2019/05/30',
    //     hoursSlept: 8.9,
    //     sleepQuality: 2.2,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/05/30',
    //     hoursSlept: 4.4,
    //     sleepQuality: 1.6,
    //   },
    //   {
    //     userID: 3,
    //     date: '2019/05/30',
    //     hoursSlept: 4,
    //     sleepQuality: 1,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/05/30',
    //     hoursSlept: 8,
    //     sleepQuality: 3.4,
    //   },
    //   {
    //     userID: 1,
    //     date: '2019/08/22',
    //     hoursSlept: 10.1,
    //     sleepQuality: 1.8,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/08/22',
    //     hoursSlept: 6.9,
    //     sleepQuality: 1.2,
    //   },
    //   {
    //     userID: 3,
    //     date: '2019/08/22',
    //     hoursSlept: 4,
    //     sleepQuality: 1,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/06/21',
    //     hoursSlept: 6.1,
    //     sleepQuality: 3.5,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/06/20',
    //     hoursSlept: 4.7,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/06/19',
    //     hoursSlept: 10.1,
    //     sleepQuality: 1.3,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/06/18',
    //     hoursSlept: 7.9,
    //     sleepQuality: 1.6,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/06/17',
    //     hoursSlept: 5.9,
    //     sleepQuality: 1.6,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/06/16',
    //     hoursSlept: 9.6,
    //     sleepQuality: 1,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/06/15',
    //     hoursSlept: 9,
    //     sleepQuality: 3.1,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/06/21',
    //     hoursSlept: 6.1,
    //     sleepQuality: 3.5,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/06/20',
    //     hoursSlept: 4.7,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/06/19',
    //     hoursSlept: 10.1,
    //     sleepQuality: 3.3,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/06/18',
    //     hoursSlept: 7.9,
    //     sleepQuality: 3.6,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/06/17',
    //     hoursSlept: 5.9,
    //     sleepQuality: 3.6,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/06/16',
    //     hoursSlept: 9.6,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/06/15',
    //     hoursSlept: 9,
    //     sleepQuality: 3.1,
    //   },
    //   {
    //     userID: 5,
    //     date: '2019/06/21',
    //     hoursSlept: 9,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 5,
    //     date: '2019/06/20',
    //     hoursSlept: 8,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 5,
    //     date: '2019/06/19',
    //     hoursSlept: 10,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 5,
    //     date: '2019/06/18',
    //     hoursSlept: 9,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 5,
    //     date: '2019/06/17',
    //     hoursSlept: 8,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 5,
    //     date: '2019/06/16',
    //     hoursSlept: 10,
    //     sleepQuality: 4,
    //   },
    //   {
    //     userID: 5,
    //     date: '2019/06/15',
    //     hoursSlept: 9,
    //     sleepQuality: 4,
    //   },
    // ];

    // sleep = new Sleep(sleepData);
    // user1 = new User({
    //   id: 1,
    //   name: 'Alex Roth',
    //   address: '1234 Turing Street, Denver CO 80301-1697',
    //   email: 'alex.roth1@hotmail.com',
    //   strideLength: 4.3,
    //   dailyStepGoal: 10000,
    //   friends: [2, 3, 4],
    // });
    // user2 = new User({
    //   id: 2,
    //   name: 'Allie McCarthy',
    //   address: '1235 Turing Street, Denver CO 80301-1697',
    //   email: 'allie.mcc1@hotmail.com',
    //   strideLength: 3.3,
    //   dailyStepGoal: 9000,
    //   friends: [1, 3, 4],
    // });
    // user3 = new User({
    //   id: 3,
    //   name: 'The Rock',
    //   address: '1236 Awesome Street, Denver CO 80301-1697',
    //   email: 'therock@hotmail.com',
    //   strideLength: 10,
    //   dailyStepGoal: 60000,
    //   friends: [1, 2, 4],
    // });

    // user4 = new User({
    //   id: 4,
    //   name: 'Rainbow Dash',
    //   address: '1237 Equestria Street, Denver CO 80301-1697',
    //   email: 'rainbowD1@hotmail.com',
    //   strideLength: 3.8,
    //   dailyStepGoal: 7000,
    //   friends: [1, 2, 3],
    // });

    // user5 = new User({
    //   id: 5,
    //   name: 'Bugs Bunny',
    //   address: '1234 Looney Street, Denver CO 80301-1697',
    //   email: 'BugsB1@hotmail.com',
    //   strideLength: 3.8,
    //   dailyStepGoal: 7000,
    //   friends: [1, 2, 3],
    // });

    // users = [user1, user2, user3, user4, user5];
    // userRepo = new UserRepo(users);
  });

  it('Should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('Should be an instance of UserRepository', () => {
    expect(sleepRepo).to.be.an.instanceof(Sleep);
  });

  it('Should have the data of they sleep objects', () => {
    expect(sleepRepo.sleepData[1].userID).to.equal(2);
    expect(sleepRepo.sleepData[3].hoursSlept).to.equal(5.4);
    expect(sleepRepo.sleepData[6].sleepQuality).to.equal(3.8);
    expect(sleepRepo.sleepData[7].date).to.equal('2019/06/16');
  });

  it('Should be undefined if no argument is given for the user', () => {
    const noSleepData = new Sleep();
    expect(noSleepData.data).to.eql(undefined);
  });

  it('Should find the average sleep hours per day for a user', () => {
    expect(sleepRepo.calculateAverageSleep(1)).to.eql(8.06);
  });

  it('Should return undefined when calculateAverageSleep is given a nonExistent user', () => {
    expect(sleepRepo.calculateAverageSleep(12)).to.eql(undefined);
  });

  it('Should find the average sleep quality per day for a user', () => {
    expect(sleepRepo.calculateAverageSleepQuality(2)).to.eql(3.49);
  });

  it('Should return undefined when calculateAverageQuality is given a nonExistent user', () => {
    expect(sleepRepo.calculateAverageSleepQuality(0)).to.eql(undefined);
  });

  it('Should find the sleep hours for a user on a specified date', function () {
    expect(sleepRepo.calculateDailySleep(2, '2019/06/15')).to.equal(7);
    expect(sleepRepo.calculateDailySleep(4, '2019/06/21')).to.equal(10.6);
  });

  it('Should find the sleep quality for a user on a specified date', function () {
    expect(sleepRepo.calculateDailySleepQuality(3, '2019/06/15')).to.equal(4.7);
    expect(sleepRepo.calculateDailySleepQuality(5, '2019/06/21')).to.equal(4.1);
  });

  it('Should get the hours slept for a user for one week', () => {
    const weekOfHoursForUser3 = [
      { date: '2019/06/15', amount: 10.8, unit: 'hours' },
      { date: '2019/06/16', amount: 10.7, unit: 'hours' },
      { date: '2019/06/17', amount: 5.3, unit: 'hours' },
      { date: '2019/06/18', amount: 9.8, unit: 'hours' },
      { date: '2019/06/19', amount: 7.2, unit: 'hours' },
      { date: '2019/06/20', amount: 9.4, unit: 'hours' },
      { date: '2019/06/21', amount: 8.9, unit: 'hours' },
    ];
    expect(sleepRepo.getWeekOfHoursSlept(3, '2019/06/21')).to.deep.eql(weekOfHoursForUser3);
  });

  it('Should get the hours slept for a user for one week', () => {
    const weekOfQualityForUser4 = [
      { date: '2019/06/15', amount: 3, unit: 'stars' },
      { date: '2019/06/16', amount: 4.5, unit: 'stars' },
      { date: '2019/06/17', amount: 1.1, unit: 'stars' },
      { date: '2019/06/18', amount: 2.5, unit: 'stars' },
      { date: '2019/06/19', amount: 2.3, unit: 'stars' },
      { date: '2019/06/20', amount: 1.9, unit: 'stars' },
      { date: '2019/06/21', amount: 2.7, unit: 'stars' },
    ];
    expect(sleepRepo.getWeekOfQualitySlept(4, '2019/06/21')).to.deep.eql(weekOfQualityForUser4);
  });

  // it('should find sleep by day for that days week', function () {
  //   expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 7.9');
  //   expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[6]).to.eql('2017/06/15: 5.4');
  // });

  // it('should find sleep quality by day for that days week', function () {
  //   expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 1.6');
  //   expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[6]).to.eql('2017/06/15: 3');
  // });
  // it('should determine the best quality sleepers for a week', function () {
  //   expect(sleep.determineBestSleepers('2019/06/21', userRepo)).to.eql(['Allie McCarthy', 'Bugs Bunny']);
  // });
  // it('should return person with best quality sleep for the week', function () {
  //   expect(sleep.determineSleepWinnerForWeek('2019/06/21', userRepo)).to.eql(['Bugs Bunny']);
  // });
  // it('should return all qualifying users if best quality sleep is a tie', function () {
  //   sleepData = sleepData.push({
  //     userID: 6,
  //     date: '2019/06/15',
  //     hoursSlept: 9,
  //     sleepQuality: 4,
  //   });
  //   let user6 = new User({
  //     id: 6,
  //     name: 'Richmond',
  //     address: '1234 Looney Street, Denver CO 80301-1697',
  //     email: 'BugsB1@hotmail.com',
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3],
  //   });
  //   users = [user1, user2, user3, user4, user5, user6];
  //   userRepo = new UserRepo(users);

  //   expect(sleep.determineSleepWinnerForWeek('2019/06/21', userRepo)).to.eql(['Bugs Bunny', 'Richmond']);
  // });

  // it('should return person with longest sleep for the day', function () {
  //   expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(['Bugs Bunny']);
  // });
  // it('should return all qualifying users if longest sleep is a tie', function () {
  //   sleepData = sleepData.push({
  //     userID: 6,
  //     date: '2019/06/21',
  //     hoursSlept: 9,
  //     sleepQuality: 4,
  //   });
  //   let user6 = new User({
  //     id: 6,
  //     name: 'Richmond',
  //     address: '1234 Looney Street, Denver CO 80301-1697',
  //     email: 'BugsB1@hotmail.com',
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3],
  //   });
  //   users = [user1, user2, user3, user4, user5, user6];
  //   userRepo = new UserRepo(users);

  //   expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.eql(['Bugs Bunny', 'Richmond']);
  // });
  //make this test fail when user is NOT best in week
});
