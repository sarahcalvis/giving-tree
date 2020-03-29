import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import ImageTiles from '../../components/ImageTiles';

test('Image Tiles Basics', () => {
  const callback = (int, string) => { console.log(int, string) }
  render(<ImageTiles
    url={[
      {
        name: 'Sly Mike Dewine',
        url: 'https://cdnph.upi.com/svc/sv/upi/7831555016823/2019/1/2a2f8d30859d917bc612eea8c6343b2e/Ohio-Gov-DeWine-signs-heartbeat-abortion-bill.jpg'
      }
    ]}
    callback={callback} />)
  expect(screen).toMatchSnapshot();
});