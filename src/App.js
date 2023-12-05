import { Divider, ConfigProvider, Typography } from 'antd';

import './App.css';
import CreatePost from './CreatePost';
import Timeline from './Timeline';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const DIVIDER_THEME = {
  token: {
    lineWidth: 1.5,
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
      id: 'A',
      desc: 'Hello, hi what are you doing? Prajjawal here. Hope you are doing good.',
      user: 'prajjawal05',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      similarExists: true,
    }, {
      id: 'B',
      desc: 'Hello, hi what are you doing? Prajjawal here. Hope you are doing good.',
      user: 'prajjawal05',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      duplicateExists: true
    }, {
      id: 'C',
      desc: 'Hello, hi what are you doing? Prajjawal here. Hope you are doing good.',
      user: 'prajjawal05',
      image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      similarExists: true,
      duplicateExists: true
    }
  ]);

  const [filter, updateFilter] = useState([]);
  const [page, updatePage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8000/api/posts/')
      .then(response => response.json())
      .then(data => {
        updatePosts(data.map(post => ({
          id: post.id,
          desc: post.desc,
          user: post.user,
          image: post.image,
          time: post.time,
          similarExists: !!post.similars,
          duplicateExists: !!post.duplicates,
        })))
      })
      .catch(error => {
        console.error(error);
      });
  }, [filter]);

  const handleCreation = data => updatePosts(prevPost => [data, ...prevPost]);

  return (
    <div className="App">
      <Title level={4} style={{ minWidth: '300px' }}>Hello, Welcome</Title>
      <CustomDivider />
      <Timeline posts={posts} filter={filter} updateFilter={updateFilter} />
      <CustomDivider />
      <CreatePost onCreate={handleCreation} />
    </div>
  );
}

export default App;
