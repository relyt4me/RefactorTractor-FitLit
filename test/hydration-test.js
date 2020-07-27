import { expect } from 'chai';
import Hydration from '../src/Hydration';
import hydrationSampleData from './sampleData/hydrationSampleData';

describe('Hydration', function () {
  let hydrationRepo;

  before(function () {
    hydrationRepo = new Hydration(hydrationSampleData);
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

  it('Should return undefined if the date or id does not exist', function () {
    expect(hydrationRepo.calculateDailyOunces(6, '2019/06/15')).to.equal(undefined);
    expect(hydrationRepo.calculateDailyOunces(4, '2020/02/31')).to.equal(undefined);
  });

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
});
