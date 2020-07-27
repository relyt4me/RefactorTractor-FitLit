import { expect } from 'chai';

import User from '../src/User';
import userSampleData from './sampleData/userSampleData';

describe('User', () => {

  let user1;

  before(() => {
    user1 = new User(userSampleData[0]);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('Should require an argument to create a new User', () => {
    expect(() => {
      new User()
    }).to.throw(Error);
  })

  it('Should take a user data object', () => {
    expect(user1.id).to.equal(1);
    expect(user1.name).to.equal('Luisa Hane');
    expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user1.strideLength).to.equal(4.3);
    expect(user1.dailyStepGoal).to.equal(10000);
    expect(user1.friends).to.deep.equal([2, 4, 3]);
  });

  it('Should return user first name', () => {
    expect(user1.getFirstName()).to.equal('Luisa');
  });

  it('Should return list of friend names from user repository', () => {
    expect(user1.getFriendsNames(userSampleData)).to.deep.equal(['Jarvis Considine', 'Mae Connelly', 'Herminia Witting']);
  });

  it('Should throw error if no arguement is used', () => {
    expect(() => {
      user1.getFriendsNames()
    }).to.throw(Error);
  });
});
