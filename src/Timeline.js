import { useState, memo, useCallback } from "react";
import { Card, Layout, Space, Typography, Divider, Upload, Modal, Avatar, Button } from "antd";
import { UserOutlined } from '@ant-design/icons';

import { getColorForCharacter, timeAgo } from "./utils";
import './Timeline.css';

const { Header, Content } = Layout;
const { Text, Paragraph, Title } = Typography;

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    color: '#000000',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#ffff',
};

const bodyStyle = {
    backgroundColor: '#ffff',
    padding: "20px 0",
    overflowY: 'scroll'
};

const PostTitle = ({ user, time = 1637081841000 }) => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <Avatar icon={<UserOutlined />} size="small" style={{ backgroundColor: getColorForCharacter(user[0]) }} /> {`${user}`}
            </div>
            <div>
                <Text type="secondary">{timeAgo(time)}</Text>
            </div>
        </div>
    )
}

const Post = ({ post: { user, image, desc, similarExists, duplicateExists, id, time }, onPreview, updateFilter }) => {
    return (
        <Card key={id} title={<PostTitle user={user} time={time} />} size="small">
            <div style={{ display: "flex", justifyContent: "left" }}>
                <Upload
                    key={id}
                    listType="picture-card"
                    fileList={[{ url: image }]}
                    className={"uploaded"}
                    onPreview={() => onPreview(image)}
                    action="/"
                    method="get"
                    maxCount={1}
                    showUploadList={{ showRemoveIcon: false }}
                />
                <div className='formDescription'>
                    <Title level={5} style={{ margin: "8px 0" }}>Description</Title>
                    <Paragraph>{desc}</Paragraph>
                </div>
                <div className='duplicates'>
                    {!!similarExists && <Text type="warning" className="similar" onClick={() => updateFilter(['SIMILAR', id])}>See similar images</Text>}
                    {!!duplicateExists && <Text type="danger" className="dup" onClick={() => updateFilter(['DUPLICATE', id])}>See duplicate images</Text>}
                </div>
            </div>
        </Card>
    )
}

const MemoisedPost = memo(Post);

const LoadMoreButton = ({ onClick }) => {
    return (
        <Button
            type="primary"
            style={{ marginTop: "20px" }}
            onClick={onClick}
        >
            Load More
        </Button>
    )
}

const TimelineContent = ({ posts, updateFilter, onPreview, hasMore, loadMore }) => {
    return (
        <>
            <Space className="content" direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
                {posts.map((post, id) => (
                    <div key={id}>
                        <MemoisedPost
                            post={post}
                            onPreview={onPreview}
                            updateFilter={updateFilter}
                        />
                    </div>
                ))}
            </Space>
            {hasMore && <LoadMoreButton onClick={loadMore} />}
        </>
    )
}

const Timeline = ({ posts, filter, updateFilter, loadMore, hasMore }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = useCallback(image => {
        setPreviewImage(image);
        setPreviewOpen(true);
    }, []);

    const handleCancel = () => setPreviewOpen(false);

    return (
        <>
            <Space direction="vertical" style={{ width: '100%', display: 'flex' }} size={[0, 48]}>
                <Layout style={{ height: "100vh" }}>
                    <Header className="header" style={headerStyle}>
                        <Title level={4}>{!filter.length ? 'All posts' : filter[0] === 'SIMILAR' ? 'Similar Posts' : 'Duplicate Posts'}</Title>
                        {!!filter.length && <Text type="secondary" className="all" onClick={() => updateFilter([])}>See All Posts</Text>}
                    </Header>
                    <Divider style={{ margin: '0' }} />
                    <Content style={bodyStyle}>
                        <TimelineContent
                            posts={posts}
                            onPreview={handlePreview}
                            updateFilter={updateFilter}
                            hasMore={hasMore}
                            loadMore={loadMore}
                        />
                    </Content>
                </Layout>
            </Space>
            <Modal open={previewOpen} title={'Preview Image'} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
};


export default Timeline;