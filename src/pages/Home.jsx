import React, { PureComponent } from 'react'
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import { List, Avatar } from "antd";
import { Input } from "antd";
import { PageHeader } from "antd";
import { Spin } from "antd";

const { Search } = Input;

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: null,
      isLoaded: false
    };
    this.data = [
      {
        title: "Ant Design Title 1",
      },
      {
        title: "Ant Design Title 2",
      },
      {
        title: "Ant Design Title 3",
      },
      {
        title: "Ant Design Title 4",
      },
    ];
  }
  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
          console.log(this.state.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={8} />
          <Col span={8} align="center">
            {" "}
            <h1>Countries</h1>{" "}
          </Col>
          <Col span={8} />
        </Row>
        <br />
        <Row>
          <Col span={2} />
          <Col span={20}>
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              enterButton
            />
          </Col>
          <Col span={2} />
        </Row>
        <br />
        <Row>
          <Col span={2} />
          <Col span={20}>
            {this.state.isLoaded ? (
              <List
                itemLayout="horizontal"
                dataSource={this.state.items}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.flag} />
                      }
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={`Capital - ${item.capital}`}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Spin size="large" />
            )}
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default Home