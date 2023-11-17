import { useState } from "react";
import { Card, Layout, Space, Typography, Divider, Upload, Modal, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

import { getColorForCharacter, timeAgo } from "./utils";
import './Timeline.css';

const { Header, Footer, Content } = Layout;
const { Text, Paragraph, Title } = Typography;
const headerStyle = {
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

const Post = ({ key, post: { user, image, desc }, onPreview }) => (
    <Card key={key} title={<PostTitle user={user} />} size="small">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Upload
                listType="picture-card"
                fileList={[{ url: image }]}
                className={"uploaded"}
                onPreview={() => onPreview(image)}
                action="/"
                method="get"
                key={key}
                maxCount={1}
                showUploadList={{ showRemoveIcon: false }}
            />
            <div className='formDescription'>
                <Title level={5} style={{ margin: "8px 0" }}>Description</Title>
                <Paragraph>{desc}</Paragraph>
            </div>
        </div>
    </Card>
)

const Timeline = ({ posts }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = image => {
        setPreviewImage(image);
        setPreviewOpen(true);
    }

    const handleCancel = () => setPreviewOpen(false);

    return (
        <>
            <Space direction="vertical" style={{ width: '100%', display: 'flex' }} size={[0, 48]}>
                <Layout style={{ height: "100vh" }}>
                    <Header style={headerStyle}>
                        <Title level={4}>All posts</Title>
                    </Header>
                    <Divider style={{ margin: '0' }} />
                    <Content style={bodyStyle}>
                        <Space className="content" direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
                            {posts.map((post, id) => <Post key={id} post={post} onPreview={handlePreview} />)}
                        </Space>
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