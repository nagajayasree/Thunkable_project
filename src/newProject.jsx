import React, { useState, useRef } from "react";
import { Button, Space, Card, Avatar, Input, Typography, Modal } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import moment from "moment";

export default function Project() {
  // state to keep track of projects
  const [projects, setProjects] = useState([]);
  // state to keep track of the value in the input
  const [project, setProject] = useState("");

  const [add, setAdd] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef(null);
  const sharedProps = {
    style: {
      width: 250,
    },
    ref: inputRef,
  };

  const { Text } = Typography;

  function handleInputChange(e) {
    setProject(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (project !== "") {
      setProjects([
        ...projects,
        {
          id: projects.length + 1,
          name: project.trim(),
          time: moment().format("MMM Do,YYYY h:mm a"),
        },
      ]);
    }
    setProject("");
    setAdd(false);
  }

  function handleDeleteClick(id) {
    const deleteProject = projects.filter((project) => {
      return project.id !== id;
    });
    setProjects(deleteProject);
  }

  const handleAdd = () => {
    setAdd((current) => !current);
  };

  const PlusButton = () => {
    return (
      <Button
        className="addButton"
        type="primary"
        onClick={handleAdd}
        shape="circle"
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="18"
              y="8.18164"
              width="1.63636"
              height="18"
              rx="0.818182"
              transform="rotate(90 18 8.18164)"
              fill="white"
            />
            <rect
              x="9.81836"
              y="18"
              width="1.63636"
              height="18"
              rx="0.818182"
              transform="rotate(180 9.81836 18)"
              fill="white"
            />
          </svg>
        }
      />
    );
  };

  return (
    <>
      <PlusButton />
      {add && (
        <Card className="createProjectCard">
          <Space>
            <Avatar src="defaultProjectIcon_2x.png" size={40} />
            <form onSubmit={handleFormSubmit}>
              <Input
                className="inputWidth"
                placeholder="Name your project"
                value={project}
                onChange={handleInputChange}
              />
            </form>
          </Space>
        </Card>
      )}
      {projects.map((project) => (
        <Card className="projectCard">
          <Space>
            <Avatar src="defaultProjectIcon_2x.png" size={40} />
            <Input className="input" {...sharedProps} value={project.name} />
            <Button
              className="editButton"
              onClick={() => {
                inputRef.current.focus({
                  cursor: "end",
                });
              }}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.65">
                    <path
                      d="M20.0248 19.3244H3.97419C3.58656 19.3244 3.27295 19.638 3.27295 20.0257C3.27295 20.4134 3.58656 20.727 3.97419 20.727H20.0248C20.4124 20.727 20.726 20.4134 20.726 20.0257C20.726 19.638 20.4124 19.3244 20.0248 19.3244ZM7.79205 17.0256L12.3793 15.0833C12.4533 15.0522 12.5196 15.0074 12.578 14.9509L20.315 7.213C20.8624 6.66558 20.8663 5.77335 20.3189 5.22593L18.7742 3.68108C18.2269 3.13366 17.3348 3.13756 16.7874 3.68498L9.05039 11.4229C8.9939 11.4793 8.9491 11.5475 8.91793 11.6216L6.97394 16.2074C6.86485 16.4646 6.94082 16.7236 7.10639 16.8912C7.27196 17.0587 7.53298 17.1347 7.79205 17.0256ZM17.7789 4.67656L17.7828 4.67267L19.3255 6.21557L19.3216 6.21946L18.1139 7.42729L16.5712 5.88439L17.7789 4.67656ZM10.149 12.3073L15.5797 6.87597L17.1224 8.41887L11.6917 13.8502L9.01532 14.984L10.149 12.3073Z"
                      fill="black"
                      fill-opacity="0.5"
                    />
                  </g>
                </svg>
              }
            />
            <Text className="dateTime">{project.time}</Text>
            <Button
              className="deleteButton"
              onClick={() => {
                Modal.confirm({
                  title: "Are you sure you want to delete this project?",
                  icon: <QuestionCircleFilled />,
                  content: "This action can't be undone.",
                  okText: "Yes",
                  cancelText: "No",
                  onOk() {
                    handleDeleteClick(project.id);
                  },
                  onCancel() {
                    setIsModalOpen(false);
                  },
                });
              }}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.46154 5.25V4.125C7.46154 3.50368 7.97813 3 8.61538 3H14.3846C15.0219 3 15.5385 3.50368 15.5385 4.125V5.25H19V6.375H4V5.25H7.46154ZM5.15385 7.5H17.8462V19.875C17.8462 20.4963 17.3296 21 16.6923 21H6.30769C5.67044 21 5.15385 20.4963 5.15385 19.875V7.5ZM7.46154 9.75V18.75H8.61538V9.75H7.46154ZM10.9231 9.75V18.75H12.0769V9.75H10.9231ZM14.3846 9.75V18.75H15.5385V9.75H14.3846Z"
                    fill="black"
                    fill-opacity="0.3"
                  />
                </svg>
              }
            />
          </Space>
        </Card>
      ))}
    </>
  );
}
