const chai = require('chai');
import { expect } from 'chai';
import DomUpdates from '../src/DomUpdates';
import Sleep from '../src/Sleep';
import Activity from '../src/Activity';
import Hydration from '../src/Hydration';
import UserRepo from '../src/User-repo';
import User from '../src/User';
const spies = require('chai-spies');
chai.use(spies);

describe('DomUpdates', () => {
  let domUpdates, currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate, userRepo;

  before(() => {
    hydrationRepo = new Hydration([
      {
        userID: 1,
        date: '2019/06/15',
        numOunces: 37,
      },
    ]);
    currentUser = new User({
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [1],
    });
    userRepo = new UserRepo([currentUser]);
    sleepRepo = new Sleep([
      {
        userID: 1,
        date: '2019/06/15',
        hoursSlept: 6.1,
        sleepQuality: 2.2,
      },
    ]);
    activityRepo = new Activity([
      {
        userID: 1,
        date: '2019/06/15',
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
    ]);

    mostRecentDate = '2019/06/15';
  });

  beforeEach(() => {
    domUpdates = new DomUpdates();
    global.document = {};
    chai.spy.on(document, ['getElementById'], () => {
      return { innerText: '' };
    });
  });

  it('Should be a function', () => {
    expect(DomUpdates).to.be.a('function');
  });

  it('Should be an instance of a DomUpdates', () => {
    expect(domUpdates).to.be.an.instanceOf(DomUpdates);
  });

  it('Should call getElementByID with the correct arguments', () => {
    domUpdates.changeInnerTextID('user-stride-length', 'HELLO');

    expect(document.getElementById).to.have.been.called.with('user-stride-length');
  });

  it('Should call call getElementById each time changeInnerTextID is called with populateUserWidget', () => {
    domUpdates.populateUserWidget(currentUser, sleepRepo, activityRepo, mostRecentDate);

    expect(document.getElementById).to.have.been.called(10);
  });

  it('Should call call getElementById each time changeInnerTextID is called with populateTodayInfo', () => {
    domUpdates.populateTodayInfo(currentUser, sleepRepo, hydrationRepo, activityRepo, mostRecentDate);

    expect(document.getElementById).to.have.been.called(7);
  });

  it('Should call call getElementById each for each cell in a column', () => {
    const weekInformation = [
      { date: '2019/06/15', amount: 38, unit: 'oz' },
      { date: '2019/06/16', amount: 91, unit: 'oz' },
      { date: '2019/06/17', amount: 96, unit: 'oz' },
      { date: '2019/06/18', amount: 70, unit: 'oz' },
      { date: '2019/06/19', amount: 76, unit: 'oz' },
      { date: '2019/06/20', amount: 71, unit: 'oz' },
      { date: '2019/06/21', amount: 27, unit: 'oz' },
    ];

    domUpdates.fillColumn('h', weekInformation);

    expect(document.getElementById).to.have.been.called(7);
  });

  it('Should know the day of the week based on the date given', () => {
    expect(domUpdates.getStringOfWeekday('2020/07/26')).to.eql('Sunday');
    expect(domUpdates.getStringOfWeekday('2020/07/28')).to.eql('Tuesday');
  });

  it('Should call getElementById correctly once to create the friend-card', () => {
    domUpdates.populateFriendsCard(currentUser, userRepo, activityRepo, mostRecentDate);

    expect(document.getElementById).to.have.been.called(1);
    expect(document.getElementById).to.have.been.called.with('friend-list');
  });

  it('Should call call getElementById each time changeInnerTextID is called with populateLeaderBoard', () => {
    domUpdates.populateLeaderBoard(userRepo, sleepRepo, activityRepo, mostRecentDate, sleepRepo.sleepData);

    expect(document.getElementById).to.have.been.called(8);
  });
});
