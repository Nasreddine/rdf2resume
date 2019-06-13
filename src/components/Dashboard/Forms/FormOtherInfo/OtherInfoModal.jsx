import React, { Component } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomSelect from "../../../core/CustomSelect";
import CustomTextarea from "../../../core/CustomTextarea";

class OtherInfoModal extends Component {
  state = {
    otherInfo: {
      otherInfoCategory: "",
      otherInfoDescription: ""
    },
    categoryValues: []
  };

  getCategoryValues() {
    return ["Publication", "Seminar"];
  }

  componentWillMount() {
    this.setState({
      categoryValues: this.getCategoryValues()
    });
  }

  handleSelectChange = (e, id) => {
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[id] = e.target.text.trim();
    this.setState({ otherInfo });
  };

  handleInputChange = e => {
    let label = e.target.id;
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[label] = e.target.value;
    this.setState({
      otherInfo
    });
  };

  handleStateObjectUpdate = item => {
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[item.label] = item[item.label];
    this.setState({ otherInfo });
  };

  handleSave = () => {
    console.log("Saved confirmed");
    this.props.handleSaveOtherInfo(this.state.otherInfo);
  };

  render() {
    let { otherInfoDescription, otherInfoCategory } = this.state.otherInfo;
    let { onHide } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={4}>Add Other Information</Col>
              <Col md={8} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomSelect
            placeholder="Category"
            id="otherInfoCategory"
            value={otherInfoCategory}
            items={this.state.categoryValues}
            handleSelectChange={this.handleSelectChange}
          />
          <CustomTextarea
            id="otherInfoDescription"
            label="Description"
            value={otherInfoDescription}
            handleChange={this.handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default OtherInfoModal;