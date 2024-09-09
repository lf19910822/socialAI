import React, { Component } from "react"; // component有花括号，取决于export的时候是否默认，不是默认放花括号里
import { Modal, Button, message } from "antd"; 
import axios from "axios";

import { PostForm } from "./PostForm";
import { BASE_URL, TOKEN_KEY } from "../constants";

class CreatePostButton extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => { // arrow function 无需 binding
    this.setState({
      visible: true,
    });
  };

  handleOk = () => { // 没有错误，将图片信息拿出来，调用API上传到后端
    this.setState({
      confirmLoading: true,
    });

    // get form data
    this.postForm // 这是指向真实form的指针
      .validateFields() // 验证成功，将form传到下一层
      .then((form) => {
        const { description, uploadPost } = form;
        const { type, originFileObj } = uploadPost[0];
        const postType = type.match(/^(image|video)/g)[0]; // 正则表达式，也可以不这么写
        if (postType) {
          let formData = new FormData();
          formData.append("message", description);
          formData.append("media_file", originFileObj);

          const opt = {
            method: "POST",
            url: `${BASE_URL}/upload`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
            data: formData,
          };

          axios(opt)
            .then((res) => {
              if (res.status === 200) {
                message.success("The image/video is uploaded!");
                this.postForm.resetFields();
                this.handleCancel();
                this.props.onShowPost(postType);
                this.setState({ confirmLoading: false });
              }
            })
            .catch((err) => { // .then之后一定要.catch
              console.log("Upload image/video failed: ", err.message);
              message.error("Failed to upload image/video!");
              this.setState({ confirmLoading: false });
            });
        }
      })
      .catch((err) => {
        console.log("err ir validate form -> ", err);
      });
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Post
        </Button>
        <Modal
          title="Create New Post"
          visible={visible}
          onOk={this.handleOk}
          okText="Create"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <PostForm ref={(refInstance) => (this.postForm = refInstance)}  /*PostForm.js中的forwardRef给refInstance赋值*//> 
        </Modal>
      </div>
    );
  }
}
export default CreatePostButton;
