import { useState } from "react";
import { Button, Modal } from "antd";
import CreatePostForm from "./CreatePostForm";

const CreatePost = () => {
    const [createOpen, setCreateOpen] = useState(false);

    const handleButton = () => setCreateOpen(true);
    const handleCancel = () => setCreateOpen(false);

    return (
        <>
            <Button type="primary" onClick={handleButton}>Create Post</Button>
            <Modal
                centered
                destroyOnClose
                maskClosable={false}
                open={createOpen}
                title={'Create Post'}
                onCancel={handleCancel}
            >
                <CreatePostForm />
            </Modal>
        </>

    );
}


export default CreatePost;