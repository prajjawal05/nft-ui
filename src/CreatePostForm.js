import React, { useState } from 'react';
import { Modal, Upload, Input, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './CreatePostForm.css'
const { TextArea } = Input;
const { Text } = Typography;


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadImage = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        file.preview = await getBase64(file.originFileObj);
        setPreviewImage(file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name);
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
            >
                {fileList.length == 1 ? 'Replace Image' : <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};


const PostUser = () => {
    return (
        <div className='formUser'>
            <Text>User</Text>
            <Input
                onChange={e => console.log("event: ", e.target.value)}
                placeholder="Enter User Name"
            />
        </div>
    )
}


const PostDescription = () => {
    return (
        <div className='formDescription'>
            <Text>Description</Text>
            <TextArea
                showCount
                maxLength={100}
                onChange={e => console.log("event: ", e.target.value)}
                placeholder="Enter Post in less than 100 characters"
                style={{ resize: 'none' }}
            />
        </div>
    )
}


const PostText = () => {
    return (
        <div className='formText'>
            <PostUser />
            <PostDescription />
        </div>
    )
}


const CreatePost = () => {
    return (
        <div className='form'>
            <UploadImage />
            <PostText />
        </div>
    )
}


export default CreatePost;