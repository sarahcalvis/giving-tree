import theme from '../../theme.js';

test('theme matches the snapshot', () => {
    expect(theme).toMatchSnapshot();
});