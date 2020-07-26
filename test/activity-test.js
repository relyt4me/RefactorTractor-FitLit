import { expect } from 'chai';
import Activity from '../src/Activity';
import UserRepo from '../src/User-repo'; //git rid of eventually
import User from '../src/User';
import activitySampleData from './sampleData/activitySampleData';

// import test data file carly made
describe('Activity', () => {
  let activityData, user1, user2, user3, user4, users, userRepo, activity,
  noActivityData;

  before(() => { // create smaller sample, probably use before
    activityData = activitySampleData
    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 5000,
      friends: [2, 3, 4]
    });

    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });

    user3 = new User({
      id: 3,
      name: "Jerry Seinfield",
      address: "32 Baker Street, Denver CO 12345",
      email: "jseinfield@gmail.com",
      strideLength: 3.8,
      dailyStepGoal: 20000,
      friends: [1, 2, 4]
    });

    user4 = new User({
      id: 4,
      name: "Patrick the Starfish",
      address: "A rock in the ocean",
      email: "thebigpstar@pacificocean.net",
      strideLength: .2,
      dailyStepGoal: 13000,
      friends: [1, 2]
    });
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
    activity = new Activity(activityData);
    noActivityData = new Activity();
  });
  it('should take in data', () => { //what data?
    expect(activity.activityData[0].userID).to.eql(1);
    expect(activity.activityData[4].date).to.eql("2019/06/15");
    expect(activity.activityData[3].numSteps).to.eql(3486);
    expect(activity.activityData[8].minutesActive).to.eql(204);
    expect(activity.activityData[10].flightsOfStairs).to.eql(18);
  });

  it('should be undefined if no argument is given for activities', () => {
    expect(noActivityData.activivityData).to.eql(undefined);
  });

  it('should return the miles a given user has walked on a given date', () => {
    expect(activity.getMilesByDate(1, "2019/06/15", user1, userRepo)).to.eql(2.9);
  });

  it('should return undefined when getMilesByDate is given for a nonExistant user', () => {
    expect(activity.getMilesByDate(1, "2019/06/15", 6, userRepo)).to.eql(undefined);
  });

  it('should return steps for given user on given date', () => {
    expect(activity.getUserDataForDay(2, "2019/06/15", 'numSteps')).to.eql({
      date: '2019/06/15',
      amount: 4294,
      type: 'steps' });
  });

  it('should return minutes active for given user on given date', () => {
    expect(activity.getUserDataForDay(1, "2019/06/18", 'minutesActive')).to.eql({
       date: '2019/06/18',
       amount: 165,
       type: 'minutesActive' });
  });

  it('should return undefined when getUserDataForDay is given a nonExistant userID', () => {
    expect(activity.getUserDataForDay(0, "2019/06/18", 'minutesActive')).to.eql(undefined);
  });

  it('should return undefined when getUserDataForDay is given a nonExistant date', () => {
    expect(activity.getUserDataForDay(1, "202020/06/18", 'minutesActive')).to.eql(undefined);
    expect(activity.getUserDataForDay(1, 2020, 'minutesActive')).to.eql(undefined);
  });

  it('should return undefined when getUserDataForDay is given a nonExistant dataType', () => {
    expect(activity.getUserDataForDay(1, "2019/06/18", 'timeSleeping')).to.eql(undefined);
  });

  it('should return the number of minutes a given user was active for on a given day', () => {
    expect(activity.userDataForToday(1, "2019/06/16", userRepo, 'minutesActive')).to.eql(175);
  });

  it('should return average active minutes in a given week', () => {
    expect(activity.calculateActiveAverageForWeek(1, "2019/06/21", userRepo)).to.eql(171.1);
  });

  it('should return undefined when alculateActiveAverageForWeek is given a nonExistant userID', () => {
    expect(activity.calculateActiveAverageForWeek(0, "2019/06/21", userRepo)).to.eql(undefined);
  });

  it('should return undefined when alculateActiveAverageForWeek is given a nonExistant date', () => {
    expect(activity.calculateActiveAverageForWeek(0, "201919/06/21", userRepo)).to.eql(undefined);
    expect(activity.calculateActiveAverageForWeek(0, 201919, userRepo)).to.eql(undefined);
  });

  it('should return true/false if the given user met their step goal on a given day', () => {
    expect(activity.accomplishStepGoal("2019/06/15", user3)).to.eql(false);
    expect(activity.accomplishStepGoal("2019/06/16", user1)).to.eql(true);
  });

  it('should return all days that a given user exceeded their step goal', () => {
    expect(activity.getDaysGoalExceeded(1, user1)).to.eql([
      "2019/06/16",
      "2019/06/17",
      "2019/06/19",
      "2019/06/20",
      "2019/06/21",
      "2019/06/22",
      "2019/06/23",
      "2019/06/24"
    ]);
  });

  it('should return undefined when getDaysGoalExceeded is given a nonexistant user', () => {
    expect(activity.getDaysGoalExceeded(1, 2)).to.eql(undefined);
  });

  it('should return the highest number of stairs climbed in a day for all time', () => {
    expect(activity.getStairRecord(2)).to.eql(44);
  });

  it('should return overall user average for an activity type', () => {
    expect(activity.getOveralUserAverage('2019/06/23', 'numSteps')).to.eql({numSteps: 8554.6})
  })

  it('should return overall user average for an activity type', () => {
    expect(activity.getOveralUserAverage('2019/06/23', 'minutesActive')).to.eql({ minutesActive: 173.6})
  })

  it('should return overall user average for an activity type', () => {
    expect(activity.getOveralUserAverage('2019/06/23', 'flightsOfStairs')).to.eql({flightsOfStairs: 11.2})
  })

  it('should return the average flight of stairs for all users on given day', () => {
    expect(activity.getAllUserAverageForDay("2019/06/15", userRepo, "flightsOfStairs")).to.eql(20.8)
  })

  it('should return average steps taken for given date for all users', () => {
    expect(activity.getAllUserAverageForDay("2019/06/23", userRepo, "numSteps")).to.eql(8554.6)
  });

  it('should return average minutes active given date for all users', () => {
    expect(activity.getAllUserAverageForDay("2019/06/23", userRepo, "minutesActive")).to.eql(173.6)
  });

  it('should return steps for given user on given date', () => {
    expect(activity.userDataForToday(2, "2019/06/15", userRepo, 'numSteps')).to.eql(4294);
  });

  it('should return minutes active for given user on given date', () => {
    expect(activity.userDataForToday(1, "2019/06/18", userRepo, 'minutesActive')).to.eql(165);
  });

  it('should return a weeks worth of steps for a given user', () => {
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'numSteps')[0]).to.eql("2019/06/23: 13928");
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'numSteps')[3]).to.eql("2019/06/20: 14478");
  });

  it('should return a weeks worth active minutes for a given user', () => {
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'minutesActive')[0]).to.eql("2019/06/23: 218");
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'minutesActive')[3]).to.eql("2019/06/20: 140");
  });

  it('should return a weeks worth stairs for a given user', () => {
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'flightsOfStairs')[0]).to.eql("2019/06/23: 21");
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'flightsOfStairs')[3]).to.eql("2019/06/20: 12");
  });

  it('should show a 3-day increasing streak for a users step count', () => {
    expect(activity.getStreak(userRepo, 1, 'numSteps')).to.eql(['2019/06/17', '2019/06/20', '2019/06/23'])
  });

  it('should show a 3-day increasing streak for a users minutes of activity', () => {
    expect(activity.getStreak(userRepo, 2, 'minutesActive')).to.eql(['2019/06/19'])
  });
})

describe('Friend Activity', () => {
  let activityData, activity, user1, user2, user3, user4, user5, users,
  friendsList, userRepo;

  before(() => {
    activityData = activitySampleData
    activity = new Activity(activityData);

    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });

    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });

    user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2]
    });

    friendsList =  [{
    userID: 1,
    date: '2019/06/15',
    numSteps: 3577,
    minutesActive: 140,
    flightsOfStairs: 16
  },
  {
    userID: 1,
    date: '2019/06/16',
    numSteps: 6637,
    minutesActive: 175,
    flightsOfStairs: 36
  },
  {
    userID: 1,
    date: '2019/06/17',
    numSteps: 14329,
    minutesActive: 168,
    flightsOfStairs: 18
  },
  {
    userID: 1,
    date: '2019/06/18',
    numSteps: 4419,
    minutesActive: 165,
    flightsOfStairs: 33
  },
  {
    userID: 1,
    date: '2019/06/19',
    numSteps: 8429,
    minutesActive: 275,
    flightsOfStairs: 2
  },
  {
    userID: 1,
    date: '2019/06/20',
    numSteps: 14478,
    minutesActive: 140,
    flightsOfStairs: 12
  },
  {
    userID: 1,
    date: '2019/06/21',
    numSteps: 6760,
    minutesActive: 135,
    flightsOfStairs: 6
  },
  {
    userID: 1,
    date: '2019/06/22',
    numSteps: 10289,
    minutesActive: 119,
    flightsOfStairs: 6
  },
  {
    userID: 1,
    date: '2019/06/23',
    numSteps: 13928,
    minutesActive: 218,
    flightsOfStairs: 21
  },
  {
    userID: 1,
    date: '2019/06/24',
    numSteps: 7186,
    minutesActive: 25,
    flightsOfStairs: 15
  },
  {
    userID: 2,
    date: '2019/06/15',
    numSteps: 4294,
    minutesActive: 138,
    flightsOfStairs: 10
  },
  {
    userID: 2,
    date: '2019/06/16',
    numSteps: 4112,
    minutesActive: 220,
    flightsOfStairs: 37
  },
  {
    userID: 2,
    date: '2019/06/17',
    numSteps: 13750,
    minutesActive: 65,
    flightsOfStairs: 4
  },
  {
    userID: 2,
    date: '2019/06/18',
    numSteps: 4662,
    minutesActive: 181,
    flightsOfStairs: 31
  },
  {
    userID: 2,
    date: '2019/06/19',
    numSteps: 9858,
    minutesActive: 243,
    flightsOfStairs: 44
  },
  {
    userID: 2,
    date: '2019/06/20',
    numSteps: 8153,
    minutesActive: 74,
    flightsOfStairs: 10
  },
  {
    userID: 2,
    date: '2019/06/21',
    numSteps: 10225,
    minutesActive: 174,
    flightsOfStairs: 26
  },
  {
    userID: 2,
    date: '2019/06/22',
    numSteps: 3605,
    minutesActive: 124,
    flightsOfStairs: 31
  },
  {
    userID: 2,
    date: '2019/06/23',
    numSteps: 4148,
    minutesActive: 142,
    flightsOfStairs: 0
  },
  {
    userID: 2,
    date: '2019/06/24',
    numSteps: 8568,
    minutesActive: 81,
    flightsOfStairs: 31
  }]
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);

  });

  it('should get a users friend lists activity', () => {
    expect(activity.getFriendsActivity(user4, userRepo)).to.deep.eql(friendsList);
  });

  it('should get a users ranked friendslist activity for a chosen week', () => {
    expect(activity.getFriendsAverageStepsForWeek(user4, "2019/06/24", userRepo)).to.eql([{
      id: 1,
      avgSteps: 9355.6
    },
    {
      id: 2,
      avgSteps: 7031.3
    }
    ]);
  });

  it('should get a users ranked friendslist activity for a chosen week with names', () => {
    expect(activity.showChallengeListAndWinner(user4, "2019/06/24", userRepo)).to.eql([
      'Alex Roth: 9355.6', 'Allie McCarthy: 7031.3'
    ])
  });

  it('should show the friend with most average steps over the previous week', function () {
    expect(activity.showcaseWinner(user1, "2019/06/24", userRepo)).to.eql('Rainbow Dash: 8294.4')
    expect(activity.showcaseWinner(user3, "2019/06/24", userRepo)).to.eql('Alex Roth: 9355.6')
  })

  it('should know the ID of the winning friend', () => {
    expect(activity.getWinnerId(user4, "2019/06/24", userRepo)).to.eql(1)
  })
});
