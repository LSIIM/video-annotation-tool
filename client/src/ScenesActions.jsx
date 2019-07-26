import React, { Component } from "react";
import Sortable from "react-sortablejs";
import { scenes, actions } from "./utils";
import { Icon, Header, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class ScenesActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items.map(item => item.toLowerCase()),
      source:
        this.props.mode === "scenes"
          ? Object.keys(scenes)
          : this.props.mode === "actions"
          ? Object.keys(actions)
          : null,
      trigger: false
    };
  }

  // state = {
  //   items: []
  // };

  render() {
    var pool =
      this.props.mode === "scenes"
        ? Object.keys(scenes)
        : this.props.mode === "actions"
        ? Object.keys(actions)
        : null;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "5px",
          minWidth: "max-content",
          ...this.props.style
        }}
      >
        <div className="col-sm-6">
          <Header size="small">
            {this.props.mode.charAt(0).toUpperCase() + this.props.mode.slice(1)}
          </Header>
          <Sortable
            options={{
              animation: 150,
              sort: true,
              group: {
                name: "clone1" + this.props.mode,
                pull: false,
                put: true
              }
            }}
            className="block-list"
            tag="ul"
            onChange={(order, sortable, evt) => {
              this.setState({ items: order });
              this.props.onChange(order, this.props.mode);
            }}
          >
            {this.state.items.map((val, key) => (
              <li key={key} data-id={val}>
                {val}
                <Icon
                  className="deletecursor"
                  name="delete"
                  style={{ float: "right" }}
                  onClick={() => {
                    const items = this.state.items;
                    console.log("deleting ", val, key, "from ", items);
                    items.splice(key, 1);
                    this.setState({
                      items: items
                    });
                  }}
                ></Icon>
              </li>
            ))}
          </Sortable>
        </div>
        <div style={{ flexDirection: "column" }} className="col-sm-6">
          <Input
            fluid
            style={{ margin: "0px 0px 5px 0px" }}
            placeholder={"Search " + this.props.mode}
            onChange={e => {
              var trigger = this.state.trigger;
              this.setState({
                source: pool.filter(item => {
                  return (
                    item.toLowerCase().indexOf(e.target.value.toLowerCase()) >=
                    0
                  );
                }),
                trigger: !trigger
              });
            }}
          />
          <div>
            <Sortable
              key={this.state.trigger}
              options={{
                animation: 150,
                sort: false,
                group: {
                  name: "clone1" + this.props.mode,
                  pull: "clone" + this.props.mode,
                  put: false
                }
              }}
              className="block-list"
              tag="ul"
            >
              {this.state.source.map((val, key) => (
                <li key={key} data-id={val}>
                  {val}
                </li>
              ))}
            </Sortable>
          </div>
        </div>
      </div>
    );
  }
}
