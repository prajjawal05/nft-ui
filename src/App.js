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
  const [posts, updatePosts] = useState([]);

  const [filter, updateFilter] = useState([]);
  const [page, updatePage] = useState(1);

  const getQueryParams = (page_num) => {
    let queryParams = `page=${page_num}`;
    if (filter[0] == 'DUPLICATE') {
      queryParams += `&duplicate_to=${filter[1]}`;
    } else if (filter[0] == 'SIMILAR') {
      queryParams += `&similar_to=${filter[1]}`;
    }

    return queryParams;
  }

  const getData = queryParams => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8000/api/posts/?${queryParams}`)
        .then(response => response.json())
        .then(data => {
          resolve(data.map(post => ({
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
          reject(error);
        });
    });
  }

  useEffect(() => {
    const fetchAndUpdatePost = async () => {
      const queryParams = getQueryParams(1);
      const updatedData = await getData(queryParams);
      updatePosts(updatedData)
    }

    fetchAndUpdatePost();
    updatePage(1);
  }, [filter]);

  useEffect(() => {
    if (page == 1) {
      return;
    }

    const fetchAndUpdate = async () => {
      const queryParams = getQueryParams(page);
      const olderPosts = await getData(queryParams);
      updatePosts(posts => [...posts, ...olderPosts]);
    }

    fetchAndUpdate();
  }, [page]);

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


/* Todo:
1. Paging
2. Rerendering
3. Styling
4. Loading
  a. create button
  b. timeline
*/