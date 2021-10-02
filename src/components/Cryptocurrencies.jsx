import React, { Fragment, useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Col, Input, Row } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = (props) => {
  const { simplified } = props;
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTearm, setSearchTearm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTearm.toLocaleLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTearm]);
  if (isFetching) return <Loader />;

  return (
    <Fragment>
      <div className="search-crypto">
        {!simplified && (
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTearm(e.target.value)}
          />
        )}
      </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt={currency.name}
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price:{millify(currency.price)}</p>
                <p>Market Cap:{millify(currency.marketCap)}</p>
                <p>
                  Daily Change:
                  {millify(currency.change)}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default Cryptocurrencies;
