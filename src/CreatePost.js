import { useState } from "react";
import { Button, Modal } from "antd";
import CreatePostForm from "./CreatePostForm";


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CreatePost = ({ onCreate }) => {
    const [createOpen, setCreateOpen] = useState(false);

    const handleButton = () => setCreateOpen(true);
    const handleCancel = () => setCreateOpen(false);

    const handleSubmit = async data => {
        // make an api call
        // image should be returned as url
        const image = await getBase64(data.image.originFileObj);
        onCreate({ ...data, image });
        handleCancel();
    }

    return (
        <div style={{ minWidth: '300px' }}>
            <Button type="primary" onClick={handleButton}>Create Post</Button>
            <Modal
                centered
                footer={null}
                destroyOnClose
                maskClosable={false}
                open={createOpen}
                title={'Create Post'}
                onCancel={handleCancel}
            >
                <CreatePostForm onSubmit={handleSubmit} />
            </Modal>
        </div>

    );
}


export default CreatePost;