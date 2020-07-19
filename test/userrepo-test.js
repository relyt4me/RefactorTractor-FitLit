import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import userSampleData from './sampleData/userSampleData';
import hydrationSampleData from './sampleData/hydrationSampleData';
import sleepSampleData from './sampleData/sleepSampleData';

describe('UserRepo', () => {
  let user1, user2, user3, users, userRepo;

  beforeEach(() => {
    user1 = new User(userSampleData[0]);
    user2 = new User(userSampleData[1]);
    user3 = new User(userSampleData[2]);
    users = [user1, user2, user3];
    userRepo = new UserRepo(users);
  });

  it('Should be a function', () => {
    expect(UserRepo).to.be.a('function');
  });
  
  it('should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceof(UserRepo);
  });

  it('should have data of all the users', () => {
    expect(userRepo.users).to.deep.eql([user1, user2, user3]);
  });

  //Sad path Test Added:
  it('should be undefined if no arguement is given for the user', () => {
    const noUser = new UserRepo()
    expect(noUser.data).to.eql(undefined);
  });

  it('should have a parameter to take in user data', function() {
    expect(userRepo.users[0].id).to.equal(1);
  });

  it('should return user data when given user ID', () => {
    const data = userRepo.getDataFromID(1);
    expect(data).to.eql(user1);
  });

  //Sad path test added:
  it('should be undefined if no id is provided for the data', () => {
    const data = userRepo.getDataFromID()
    expect(data).to.eql(undefined)  
  });

  it('should get a users data from its userID in any data set', () => {
    expect(userRepo.getDataFromUserID(1, hydrationSampleData)).to.eql([
      { userID: 1, date: '2019/06/15', numOunces: 37 },
      { userID: 1, date: '2019/06/16', numOunces: 69 },
      { userID: 1, date: '2019/06/17', numOunces: 96 },
      { userID: 1, date: '2019/06/18', numOunces: 61 },
      { userID: 1, date: '2019/06/19', numOunces: 91 },
      { userID: 1, date: '2019/06/20', numOunces: 50 },
      { userID: 1, date: '2019/06/21', numOunces: 50 }
    ]);
  });

  it('should return the average of all users step goals', () => {
    const stepGoals = userRepo.calculateAverageStepGoal();
    expect(stepGoals).to.eql(6667);
  });

  //All the tests below are related to grabbing arrays and sorting them. 

  describe('array changes', () => {
    let user1, user2, user3, user4, user5, users, userRepo;

    beforeEach(() => {
      user1 = new User(userSampleData[0]);
      user2 = new User(userSampleData[1]);
      user3 = new User(userSampleData[2]);
      user4 = new User(userSampleData[3]);
      user5 = new User(userSampleData[4]);
      users = [user1, user2, user3, user4, user5];
      userRepo = new UserRepo(users);
    });

    it('should sort the given array given by date', () => {
      const sortedHydro = userRepo.makeSortedUserArray(1, hydrationSampleData)
      expect(sortedHydro).to.eql([
        { userID: 1, date: '2019/06/21', numOunces: 50 },
        { userID: 1, date: '2019/06/20', numOunces: 50 },
        { userID: 1, date: '2019/06/19', numOunces: 91 },
        { userID: 1, date: '2019/06/18', numOunces: 61 },
        { userID: 1, date: '2019/06/17', numOunces: 96 },
        { userID: 1, date: '2019/06/16', numOunces: 69 },
        { userID: 1, date: '2019/06/15', numOunces: 37 }
      ]);
    });

    it('should get a users most recent date using the app', () => {
      expect(userRepo.getToday(4, hydrationSampleData)).to.eql('2019/06/21');
    });

    it('should sort data by date and extract its week', () => {
      const week = userRepo.getFirstWeek(1, hydrationSampleData)
      expect(week).to.eql([
        { userID: 1, date: '2019/06/21', numOunces: 50 },
        { userID: 1, date: '2019/06/20', numOunces: 50 },
        { userID: 1, date: '2019/06/19', numOunces: 91 },
        { userID: 1, date: '2019/06/18', numOunces: 61 },
        { userID: 1, date: '2019/06/17', numOunces: 96 },
        { userID: 1, date: '2019/06/16', numOunces: 69 },
        { userID: 1, date: '2019/06/15', numOunces: 37 }
      ]);
    });

    it('should get a sorted week of data for a single user from a date', () => {
      const weekHydro = userRepo.getWeekFromDate('2019/06/15', 1, hydrationSampleData)
      expect(weekHydro).to.eql([{ userID: 1, date: '2019/06/15', numOunces: 37 }]);
    });

    it('should get a week of data for all users in data set', () => {
      const weekHydro = userRepo.chooseWeekDataForAllUsers(hydrationSampleData, '2019/06/15');
      expect(weekHydro).to.eql([
        { userID: 1, date: '2019/06/15', numOunces: 37 },
        { userID: 2, date: '2019/06/15', numOunces: 38 },
        { userID: 3, date: '2019/06/15', numOunces: 47 },
        { userID: 4, date: '2019/06/15', numOunces: 85 },
        { userID: 5, date: '2019/06/15', numOunces: 42 },
      ]);  
    });

    it('should get a day of data for all users in data set', () => {
      const weekHydro = userRepo.chooseDayDataForAllUsers(hydrationSampleData, '2019/06/15');
      expect(weekHydro).to.eql([
        { userID: 1, date: '2019/06/15', numOunces: 37 },
        { userID: 2, date: '2019/06/15', numOunces: 38 },
        { userID: 3, date: '2019/06/15', numOunces: 47 },
        { userID: 4, date: '2019/06/15', numOunces: 85 },
        { userID: 5, date: '2019/06/15', numOunces: 42 },
      ]);  
    });

    it('should isolate a user ID and its values of any relevant data', () => {
      const idAndDataSleep = userRepo.isolateUsernameAndRelevantData(sleepSampleData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepSampleData, "2019/06/21"));
      const idAndDataHydro = userRepo.isolateUsernameAndRelevantData(hydrationSampleData, "2019/06/21", 'numOunces', userRepo.chooseWeekDataForAllUsers(hydrationSampleData, "2019/05/09"));
      expect(idAndDataSleep).to.eql({
        '1': [2.2, 3.8, 2.6, 3.1, 1.2, 1.2, 4.2],
        '2': [4.7, 3.8, 3, 3.2, 2.5, 2.4, 4.8],
        '3': [4.7, 3.4, 4.9, 2.6, 3.4, 1.2, 3.7],
        '4': [3, 4.5, 1.1, 2.5, 2.3, 1.9, 2.7],
        '5': [3.6, 2.4, 3.7, 4.1, 3.4, 3.5, 4.1]
      })
      expect(idAndDataHydro).to.eql({})
    });

    it('should rank user ids according to relevant data value averages', () => {
      const weekSleep = userRepo.rankUserIDsbyRelevantDataValue(sleepSampleData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepSampleData, "2019/06/21"))
      expect(weekSleep).to.eql(['5', '2', '3', '1', '4'])
    });

    it('should show list in order of userID and average of relevant value', () => {
      const weekSleep = userRepo.combineRankedUserIDsAndAveragedData(sleepSampleData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepSampleData, "2019/06/21"))
      expect(weekSleep).to.eql([
        { "5": 3.5428571428571423 },
        { "2": 3.4857142857142853 },
        { "3": 3.414285714285714 },
        { "1": 2.614285714285714 },
        { "4": 2.5714285714285716 }
      ])
    });
  });
});