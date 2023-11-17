import { useState } from "react";
import { Button, Modal } from "antd";
import CreatePostForm from "./CreatePostForm";


const CreatePost = ({ onCreate }) => {
    const [createOpen, setCreateOpen] = useState(false);

    const handleButton = () => setCreateOpen(true);
    const handleCancel = () => setCreateOpen(false);

    const handleSubmit = data => {
        // make an api call
        // image should be returned as url
        onCreate({ ...data, image: data.image.thumbUrl });
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