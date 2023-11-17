import { useState } from "react";
import { Button, Modal } from "antd";
import CreatePostForm from "./CreatePostForm";


const CreatePost = () => {
    const [createOpen, setCreateOpen] = useState(false);

    const handleButton = () => setCreateOpen(true);
    const handleCancel = () => setCreateOpen(false);

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
                <CreatePostForm />
            </Modal>
        </div>

    );
}


export default CreatePost;