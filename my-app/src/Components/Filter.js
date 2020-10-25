import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;
const topic = [
  {
    _id: 1,
    name: "Entertainment",
  },

  {
    _id: 2,
    name: "Sports",
  },

  {
    _id: 3,
    name: "Technology",
  },
];

function Filter(props) {
  const [checked, setChecked] = useState([]);
  const toggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex == -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };
  const renderCheckbox = () =>
    topic.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => toggle(value._id)}
          type="checkbox"
          checked={checked.indexOf(value._id) == -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="hello" key="1">
          {renderCheckbox()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default Filter;
