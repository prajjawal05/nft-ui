import { Divider, ConfigProvider, Typography } from 'antd';

import './App.css';
import CreatePost from './CreatePost';
import Timeline from './Timeline';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const PAGE_SIZE = 10;
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
  const [hasMore, updateHasMore] = useState(false);

  const getQueryParams = (page_num) => {
    let queryParams = `page=${page_num}`;
    if (filter[0] === 'DUPLICATE') {
      queryParams += `&duplicate_to=${filter[1]}`;
    } else if (filter[0] === 'SIMILAR') {
      queryParams += `&similar_to=${filter[1]}`;
    }

    return queryParams;
  }

  const getData = queryParams => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8000/api/posts/?${queryParams}`)
        .then(response => response.json())
        .then(response => {
          const data = response.map(post => ({
            id: post.id,
            desc: post.desc,
            user: post.user,
            image: post.image,
            time: post.time,
            similarExists: !!post.similars,
            duplicateExists: !!post.duplicates,
          }));
          let hasMore = true;
          if (data.length < PAGE_SIZE) {
            hasMore = false;
          }
          resolve({ data, hasMore });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  useEffect(() => {
    const fetchAndUpdatePost = async () => {
      const queryParams = getQueryParams(1);
      const { data: updatedData, hasMore } = await getData(queryParams);
      updatePosts(updatedData)
      updateHasMore(hasMore);
    }

    fetchAndUpdatePost();
    updatePage(1);
  }, [filter]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    const fetchAndUpdate = async () => {
      const queryParams = getQueryParams(page);
      const { data: olderPosts, hasMore } = await getData(queryParams);
      updatePosts(posts => [...posts, ...olderPosts]);
      updateHasMore(hasMore);
    }

    fetchAndUpdate();
  }, [page]);

  const handleCreation = data => updatePosts(prevPost => [data, ...prevPost]);

  return (
    <div className="App">
      <Title level={4} style={{ minWidth: '300px' }}>Hello, Welcome</Title>
      <CustomDivider />
      <Timeline
        posts={posts}
        filter={filter}
        updateFilter={updateFilter}
        loadMore={() => updatePage(p => p + 1)}
        hasMore={hasMore}
      />
      <CustomDivider />
      <CreatePost onCreate={handleCreation} />
    </div>
  );
}

export default App;


/* Todo:
1. Loading
  a. create button
  b. timeline
  c. Load more
*/