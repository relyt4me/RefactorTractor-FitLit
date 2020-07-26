import { expect } from 'chai';

import sleepSampleData from './sampleData/sleepSampleData';
import userSampleData from './sampleData/userSampleData';
import Sleep from '../src/Sleep';

describe('Sleep', function () {
  let sleepRepo;

  beforeEach(function () {
    sleepRepo = new Sleep(sleepSampleData);
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
    expect(sleepRepo.calculateAverageSleep(1)).to.eql(8.1);
  });

  it('Should return undefined when calculateAverageSleep is given a nonExistent user', () => {
    expect(sleepRepo.calculateAverageSleep(12)).to.eql(undefined);
  });

  it('Should find the average sleep quality per day for a user', () => {
    expect(sleepRepo.calculateAverageSleepQuality(2)).to.eql(3.5);
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

  it('Should get the average quality across all users', () => {
    expect(sleepRepo.calculateAllUserAvgSleepMetric('sleepQuality')).to.eql(3.1);
  });

  it('Should get an array of all users who sleep average above 3 for a week', () => {
    expect(sleepRepo.getUsersWithQualityAbove3('2019/06/21')).to.eql([2, 3, 5]);
  });

  it('Should give the user IDs of all users with the highest Hours of Sleep', () => {
    let users = {
      'users': [
        { "id": 1, "name": "Luisa Hane" }, 
        { "id": 2, "name": "Jarvis Consideine" }
      ]};
    expect(sleepRepo.getSleepWinnerForDay('2019/06/18', sleepSampleData, users))
      .to.eql({ "hoursSlept": 10.8, "user": "Jarvis Consideine" });
  });
});
