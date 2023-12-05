import React, { useState } from 'react';
import { Modal, Upload, Input, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './PostForm.css'
const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadImage = ({ formData }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);

    const { image: { fileList = [] } = {} } = formData;

    const handlePreview = async (file) => {
        file.preview = await getBase64(file.originFileObj);
        setPreviewImage(file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name);
    };

    return (
        <>
            <Form.Item
                label="Image"
                name="image"
                required
                rules={[({ getFieldValue }) => ({
                    validator() {
                        const image = getFieldValue('image') || {};
                        if (!image || !image.fileList || !image.fileList.length) {
                            return Promise.reject(new Error('Image required!'));
                        }
                        return Promise.resolve();
                    },
                })]}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    className={fileList.length === 1 && "uploaded"}
                    onPreview={handlePreview}
                    action="/"
                    method="get"
                    maxCount={1}
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
            </Form.Item>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};


const PostUser = () => {
    return (
        <div className='formUser'>
            <Form.Item
                label="Username"
                name="user"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    placeholder="Enter User Name"
                />
            </Form.Item>
        </div>
    )
}


const PostDescription = () => {
    return (
        <div className='formDescription'>
            <Form.Item
                label="Description"
                name="desc"
                rules={[{ required: true, message: 'Please input your description!' }]}
            >
                <TextArea
                    maxLength={100}
                    placeholder="Enter Post in less than 100 characters"
                    style={{ resize: 'none' }}
                />
            </Form.Item>
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


const CreatePost = ({ onSubmit }) => {
    const [formData, updateFormData] = useState({});
    const [loading, updateLoading] = useState(false);

    const handleFinish = ({ user, desc, image }) => {
        updateLoading(true);
        const formData = new FormData();
        formData.append('image', image.file.originFileObj); // Assuming you have a variable 'yourImageFile' representing the image file
        formData.append('username', user);
        formData.append('description', desc);
        fetch('http://localhost:8000/api/upload/', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            const currTime = Math.floor(new Date().getTime() / 1000);
            onSubmit({ id: data.body.postId, user, desc, image: image.file, time: currTime });
        })
    }

    const handleValChange = data => {
        updateFormData(prevData => ({ ...prevData, ...data }));
    }

    console.log(loading);

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleFinish}
            onFinishFailed={() => console.log('some error in form')}
            onValuesChange={handleValChange}
            autoComplete="off"
            className='form'
        >
            <UploadImage formData={formData} />
            <PostText />
            <Form.Item
            >
                <Button loading={loading} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}


export default CreatePost;