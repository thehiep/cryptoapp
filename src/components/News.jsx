import React, { useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Avatar, Card, Col, Row, Typography, Select } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState("Cryptocurrency");
  const { data: cryptosList, isFetching } = useGetCryptosQuery(100);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 10 : 100,
  });
  if (!cryptoNews?.value) return <Loader />;
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setnewsCategory(value)}
            filterOption={(input, option) =>
              option.children
                .toLowerCase()
                .indexOf(input.toLocaleLowerCase()) >= 0
            }
          >
            <Select.Option value="Cryptocurrency">Cryptocurrency</Select.Option>
            {cryptosList?.data?.coins.map((coin) => (
              <Select.Option value={coin.name} key={coin.name}>
                {coin.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt={news.name}
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
