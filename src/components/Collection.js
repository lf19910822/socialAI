

import React, { useState, useEffect } from "react";
import { Tabs, message, Row, Col } from "antd";
import axios from "axios"; // axios：前后端链接，向后端发送请求

import SearchBar from "./SearchBar";
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../constants";
import PhotoGallery from "./PhotoGallery";
import CreatePostButton from "./CreatePostButton";

const { TabPane } = Tabs;

function Collection(props) {
  const [posts, setPost] = useState([]);
  const [activeTab, setActiveTab] = useState("image");
  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    keyword: "",
  });

  const handleSearch = (option) => setSearchOption(option);

  useEffect(() => {
    fetchPost(searchOption); // 当searchOption改变，自动调用 fetchPosts
  }, [searchOption]);

  const fetchPost = (option) => {
    const { type, keyword } = option;
    let url = "";

    if (type === SEARCH_KEY.all) {
      url = `${BASE_URL}/search`;
    } else if (type === SEARCH_KEY.user) {
      url = `${BASE_URL}/search?user=${keyword}`;
    } else {
      url = `${BASE_URL}/search?keywords=${keyword}`;
    }

    const opt = {
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };

    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          setPost(res.data);
        }
      })
      .catch((err) => {
        message.error("Fetch posts failed!");
        console.log("fetch posts failed: ", err.message);
      });
  };

  const renderPosts = (type) => {
    if (!posts || posts.length === 0) {
      return <div>No data!</div>;
    }

    let filtered;

    if (type === "image") { // 筛选出后端来的image
      filtered = posts.filter((post) => post.type === "image"); // filter（）：把post应用到后面的function，true留下false删掉
      if (!filtered || filtered.length === 0) {
        return <div>No images!</div>;
      }
      const imageArr = filtered.map((image) => {
        return {
          postId: image.id,
          src: image.url,
          user: image.user,
          caption: image.message,
          thumbnail: image.url,
          thumbnailWidth: 300,
          thumbnailHeight: 200,
        };
      });

      return <PhotoGallery images={imageArr} />;
    } else if (type === "video") {
      filtered = posts.filter((post) => post.type === "video");
      if (!filtered || filtered.length === 0) {
        return <div>No videos!</div>;
      }
      return (
        <Row>
          {filtered.map((post) => ( // 以下均为antdesign中的属性
            <Col span={24} key={post.url}>
              <video src={post.url} controls={true} className="video-block" />
            </Col>
          ))}
        </Row>
      );
    }
  };

  const showPost = (type) => {
    console.log("type", type);
    setActiveTab(type);
    setTimeout(() => {
      setSearchOption({ type: SEARCH_KEY.all, keyword: "" });
    }, 3000);
  };

  const operations = <CreatePostButton onShowPost={showPost} />;

  return (
    <div className="home">
      <SearchBar handleSearch={handleSearch} />
      <div className="display">
        <Tabs
          onChange={(key) => setActiveTab(key)}
          defaultActiveKey="image"
          activeKey={activeTab}
          tabBarExtraContent={operations}
        >
          <TabPane tab="Images" key="image">
            {renderPosts("image")}
          </TabPane>
          <TabPane tab="Videos" key="video">
            {renderPosts("video")}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Collection;


