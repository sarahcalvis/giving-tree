import {getDateFromSeconds} from '../../components/EditGrant';

describe('Get date from seconds', () => {
  test('Date in the past', () => {
    expect(getDateFromSeconds(1581360000)).toEqual(new Date(1581362026000));
  });
});