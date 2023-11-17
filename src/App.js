import { Divider, ConfigProvider, Typography } from 'antd';

import './App.css';
import CreatePost from './CreatePost';
import Timeline from './Timeline';
import { useState } from 'react';

const { Title } = Typography;

const DIVIDER_THEME = {
  token: {
    lineWidth: 4,
    colorSplit: 'rgba(0, 0, 0, 0.88)',
    lineHeight: '100%'
  },
};

const CustomDivider = () => (
  <ConfigProvider theme={DIVIDER_THEME}>
    <Divider type='vertical' style={{ height: '100vh', marginInline: 0 }} />
  </ConfigProvider>
);

function App() {
  const [posts, updatePosts] = useState([
    {
      desc: 'Hello, hi what are you doing? Prajjawal here. Hope you are doing good.',
      user: 'prajjawal05',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }, {
      desc: 'Hello, hi what are you doing? Prajjawal here. Hope you are doing good.',
      user: 'prajjawal05',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ]);

  const handleCreation = data => updatePosts(prevPost => [data, ...prevPost]);

  return (
    <div className="App">
      <Title level={4} style={{ minWidth: '300px' }}>Hello, Welcome</Title>
      <CustomDivider />
      <Timeline posts={posts} />
      <CustomDivider />
      <CreatePost onCreate={handleCreation} />
    </div>
  );
}

export default App;
