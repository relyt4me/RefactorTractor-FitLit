import { expect } from 'chai';
import Hydration from '../src/Hydration';
// import UserRepo from '../src/User-repo';
// import User from '../src/User';
import hydrationSampleData from './sampleData/hydrationSampleData';
// import userSampleData from './sampleData/userSampleData';

describe.only('Hydration', function () {
  let hydrationRepo;
  // let user1, user2, user3, user4, user5, users, userRepo;
  // let hydrationData;
  // let hydration;

  beforeEach(function () {
    hydrationRepo = new Hydration(hydrationSampleData);
    // user1 = new User(userSampleData[0]);
    // user2 = new User(userSampleData[1]);
    // user3 = new User(userSampleData[2]);
    // user4 = new User(userSampleData[3]);
    // user5 = new User(userSampleData[4]);
    // users = [user1, user2, user3, user4, user5];
    // userRepo = new UserRepo(users);
    // hydrationData = [
    //   {
    //     userID: 1,
    //     date: '2019/06/15',
    //     numOunces: 37,
    //   },
    //   {
    //     userID: 2,
    //     date: '2019/06/15',
    //     numOunces: 38,
    //   },
    //   {
    //     userID: 3,
    //     date: '2019/05/09',
    //     numOunces: 1,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/04/15',
    //     numOunces: 36,
    //   },
    //   {
    //     userID: 2,
    //     date: '2018/10/23',
    //     numOunces: 34,
    //   },
    //   {
    //     userID: 1,
    //     date: '2018/06/16',
    //     numOunces: 39,
    //   },
    //   {
    //     userID: 3,
    //     date: '2018/03/30',
    //     numOunces: 2,
    //   },
    //   {
    //     userID: 4,
    //     date: '2018/02/01',
    //     numOunces: 28,
    //   },
    //   {
    //     userID: 1,
    //     date: '2016/08/22',
    //     numOunces: 30,
    //   },
    //   {
    //     userID: 3,
    //     date: '2016/05/14',
    //     numOunces: 3,
    //   },
    //   {
    //     userID: 2,
    //     date: '2016/04/27',
    //     numOunces: 40,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/03/15',
    //     numOunces: 35,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/09/20',
    //     numOunces: 40,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/09/19',
    //     numOunces: 30,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/09/18',
    //     numOunces: 40,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/09/17',
    //     numOunces: 40,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/09/16',
    //     numOunces: 30,
    //   },
    //   {
    //     userID: 4,
    //     date: '2019/09/15',
    //     numOunces: 30,
    //   },
    // ];

    // hydration = new Hydration(hydrationData);
  });

  it('Should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('Should be an instance of Hydration', () => {
    expect(hydrationRepo).to.be.an.instanceOf(Hydration);
  });

  it('Should have the data of the hydration objects', () => {
    expect(hydrationRepo.hydrationData[0].userID).to.equal(1);
    expect(hydrationRepo.hydrationData[2].numOunces).to.equal(47);
    expect(hydrationRepo.hydrationData[5].date).to.equal('2019/06/16');
  });

  it('Should be undefined if no argument is given for the hydration', () => {
    const noHydrationData = new Hydration();
    expect(noHydrationData.hydrationData).to.eql(undefined);
  });

  it('Should find the average water intake per day for a user', function () {
    expect(hydrationRepo.calculateAverageOunces(3)).to.equal(55.86);
  });

  it('Should return undefined when calculateAverage is given for a nonExistant user', () => {
    expect(hydrationRepo.calculateAverageOunces(6)).to.eql(undefined);
  });

  it('Should find the water intake for a user on a specified date', function () {
    expect(hydrationRepo.calculateDailyOunces(1, '2019/06/15')).to.equal(37);
    expect(hydrationRepo.calculateDailyOunces(4, '2019/06/18')).to.equal(93);
  });

  // it('Should return undefined if the date or id does not exist', function () {
  //   expect(hydrationRepo.calculateDailyOunces(6, '2019/06/15')).to.equal(undefined);
  //   expect(hydrationRepo.calculateDailyOunces(4, '2020/02/31')).to.equal(undefined);
  // });

  it('Should find the water intake for a user for one week based on a final date', () => {
    const weekOfOuncesForUser2 = [
      { date: '2019/06/15', amount: 38, unit: 'oz' },
      { date: '2019/06/16', amount: 91, unit: 'oz' },
      { date: '2019/06/17', amount: 96, unit: 'oz' },
      { date: '2019/06/18', amount: 70, unit: 'oz' },
      { date: '2019/06/19', amount: 76, unit: 'oz' },
      { date: '2019/06/20', amount: 71, unit: 'oz' },
      { date: '2019/06/21', amount: 27, unit: 'oz' },
    ];
    expect(hydrationRepo.getWeekOfOunces(2, '2019/06/21')).to.deep.eql(weekOfOuncesForUser2);
  });

  it('Should return an empty array if the id or endDate do not exist with getWeekOfOunces', () => {
    expect(hydrationRepo.getWeekOfOunces(30, 'not a real date')).to.eql([]);
  });

  // *************** BELOW WILL NOT BE NECESSARY AFTER
  // *************** secondary Functions are removed in hydration
  // it('should find water intake by day for first week', function () {
  //   const user3 = new User({
  //     id: 3,
  //     name: 'The Rock',
  //     address: '1236 Awesome Street, Denver CO 80301-1697',
  //     email: 'therock@hotmail.com',
  //     strideLength: 10,
  //     dailyStepGoal: 60000,
  //     friends: [1, 2, 4],
  //   });

  //   const user4 = new User({
  //     id: 4,
  //     name: 'Rainbow Dash',
  //     address: '1237 Equestria Street, Denver CO 80301-1697',
  //     email: 'rainbowD1@hotmail.com',
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3],
  //   });
  //   const users = [user3, user4];
  //   const userRepo = new UserRepo(users);
  //   expect(hydration.calculateFirstWeekOunces(userRepo, 4)[0]).to.eql('2019/09/20: 40');
  //   expect(hydration.calculateFirstWeekOunces(userRepo, 4)[6]).to.eql('2019/04/15: 36');
  // });

  // it('should find sleep quality by day for that days week', function () {
  //   const user3 = new User({
  //     id: 3,
  //     name: 'The Rock',
  //     address: '1236 Awesome Street, Denver CO 80301-1697',
  //     email: 'therock@hotmail.com',
  //     strideLength: 10,
  //     dailyStepGoal: 60000,
  //     friends: [1, 2, 4],
  //   });

  //   const user4 = new User({
  //     id: 4,
  //     name: 'Rainbow Dash',
  //     address: '1237 Equestria Street, Denver CO 80301-1697',
  //     email: 'rainbowD1@hotmail.com',
  //     strideLength: 3.8,
  //     dailyStepGoal: 7000,
  //     friends: [1, 2, 3],
  //   });
  //   const users = [user3, user4];
  //   const userRepo = new UserRepo(users);
  //   console.log('HELOOO', hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo));
  //   expect(hydration.calculateRandomWeekOunces('2019/09/18', 4, userRepo)[0]).to.eql('2019/09/18: 40');
  // expect(hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo)[6]).to.eql('2019/09/16: 30');
  //this is failing because it doesn't exist, need a failure case
  //day of hydration should not include user 2 or user 1 on August 22
  //week of hydration should not include user 4 not during the week
});
