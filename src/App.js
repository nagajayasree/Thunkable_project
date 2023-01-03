import { Layout, Avatar, Typography } from "antd";
import Project from "./newProject";
import "./styles/project.css";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <Avatar src="ThunkableBeaver.png" size={40} />
        <Typography.Title className="title" level={3}>
          MY PROJECTS
        </Typography.Title>
      </Header>
      <Content className="contentStyle">
        <Project />
      </Content>
    </Layout>
  );
}

export default App;
