import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import WorkHistoryModal from "./Modals/FormWorkHistory/WorkHistoryModal";
import WorkHistoryView from "./Modals/FormWorkHistory/WorkHistoryView";
import AddButton from "../../core/AddButton";

class FormWorkHistory extends Component {
  state = {
    showModal: false
  };

  componentWillMount() {
    
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  render() {
    let { showModal } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>Work History</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <WorkHistoryModal
                  show={showModal}
                  onHide={this.handleClose}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>Add work history</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.workHistories.map((workHistory) => (
          <WorkHistoryView
            workHistory={workHistory}
            id={workHistory.id}
            key={workHistory.id}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    workHistories: Object.values(state.cv.workHistory)
  };
};

export default connect(mapStateToProps, {})(FormWorkHistory);
