import React, { useState } from 'react';
import { Modal, Upload, Input, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './PostForm.css';


const { Text, Paragraph, Title } = Typography;


const ImagePreview = ({ image }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([{
        url: image
    }]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        setPreviewTitle('Uploaded Image');
    };

    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                className={fileList.length == 1 && "uploaded"}
                onPreview={handlePreview}
                onChange={handleChange}
                action="/"
                method="get"
                maxCount={1}
                showUploadList={{ showRemoveIcon: false }}
            >
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};


const PostUser = ({ user }) => {
    return (
        <div className='formUser'>
            <Title level={5}>User</Title>
            <Text>{user}</Text>
        </div>
    )
}


const PostDescription = ({ desc }) => {
    return (
        <div className='formDescription'>
            <Title level={5}>Description</Title>
            <Paragraph>{desc}</Paragraph>
        </div>
    )
}


const PostText = ({ post }) => {
    const { user, desc } = post;
    return (
        <div className='formText' style={{ maxWidth: '300px' }}>
            <PostUser user={user} />
            <PostDescription desc={desc} />
        </div>
    )
}


const PreviewPost = ({ id }) => {
    const post = {
        user: 'prajjawal05',
        desc: 'Hello, hi what are you doing? Prajjawal here. Hope you are doing good.',
        image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
    return (
        <div className='form'>
            <ImagePreview image={post.image} />
            <PostText post={post} />
        </div>
    )
}


export default PreviewPost;