import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import userSampleData from './sampleData/userSampleData';

describe('User', () => {

  let user1, user2, user3, user4, users, userRepo;

  beforeEach(() => {
    user1 = new User(userSampleData[0]);
    user2 = new User(userSampleData[1]);
    user3 = new User(userSampleData[2]);
    user4 = new User(userSampleData[3]);
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
  });


  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('Should take a user data object', () => {
    expect(user1.id).to.equal(1);
    expect(user1.name).to.equal('Luisa Hane');
    expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user1.strideLength).to.equal(4.3);
    expect(user1.dailyStepGoal).to.equal(10000);
    expect(user1.friends).to.deep.equal([2, 4, 8]);
  });

  it('Should return user first name', () => {
    expect(user1.getFirstName()).to.equal('Luisa');
  });

  it('Should return list of friend names from user repository', () => {
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
      friends: [1, 2, 3]
    });
  
    expect(user2.getFriendsNames(userRepo)).to.deep.equal(['Luisa Hane', 'Herminia Witting', 'Mae Connelly']);
  });
});
