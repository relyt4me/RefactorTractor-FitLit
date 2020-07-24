const chai = require('chai');
import { expect } from 'chai';
import DomUpdates from '../src/DomUpdates';
const spies = require('chai-spies');
chai.use(spies);

describe('DomUpdates', () => {

  let domUpdates, currentUser, data, userRepo;

  beforeEach(() => {
    domUpdates = new DomUpdates();
    chai.spy.on(domUpdates, 'populateUserWidget', () => {});
  });

  it('Should be a function', () => {
    expect(DomUpdates).to.be.a('function');
  });

  it('Should be an instance of a DomUpdates', () => {
    expect(domUpdates).to.be.an.instanceOf(DomUpdates);
  });

  it('Should call populateUserWidget correctly', () => {
    domUpdates.populateUserWidget(currentUser, data, userRepo);
    expect(domUpdates.populateUserWidget).to.have.been.called(1);
  });
});