import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import userSampleData from './sampleData/userSampleData';

describe('UserRepo', () => {
  let user1, user2, user3, users, userRepo;

  before(() => {
    user1 = new User(userSampleData[0]);
    user2 = new User(userSampleData[1]);
    user3 = new User(userSampleData[2]);
    users = [user1, user2, user3];
    userRepo = new UserRepo(users);
  });

  it('Should be a function', () => {
    expect(UserRepo).to.be.a('function');
  });

  it('Should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceof(UserRepo);
  });

  it('Should not require an argument to create a new UserRepo', () => {
    expect(() => {
      new UserRepo()
    }).to.not.throw(Error);
  })

  it('Should be undefined if no arguement is given for the user', () => {
    const noUser = new UserRepo()
    expect(noUser.data).to.eql(undefined);
  });

  it('Should have data of all the users', () => {
    expect(userRepo.users).to.deep.eql([user1, user2, user3]);
  });

  it('Should have a parameter to take in user data', () => {
    expect(userRepo.users[0].id).to.equal(1);
  });

  it('Should return a user when given a user ID', () => {
    const data = userRepo.getDataFromID(1);
    expect(data).to.eql(user1);
  });

  it('Should be undefined if no id is provided for the data', () => {
    const data = userRepo.getDataFromID()
    expect(data).to.eql(undefined)
  });

  it('Should be undefined if arguement provided is wrong data type', () => {
    const data = userRepo.getDataFromID("wrong data type")
    expect(data).to.eql(undefined)
  });

  it('Should return the average of all users step goals', () => {
    const stepGoals = userRepo.calculateAverageStepGoal();
    expect(stepGoals).to.eql(6667);
  });
});
