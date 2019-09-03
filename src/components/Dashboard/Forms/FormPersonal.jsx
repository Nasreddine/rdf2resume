import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import RemoveButton from "../../core/RemoveButton";
import CustomInput from "../../core/CustomInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CustomRadioGroup from "../../core/CustomRadioGroup";
import { Combobox, Multiselect } from "react-widgets";
import { connect } from "react-redux";
import {
  updateAboutPerson,
  createIM,
  updateIM,
  removeIM
} from "../../../actions";
import {
  fetchCountries,
  fetchGenders,
  fetchTitleProperties
} from "../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveGenderValues,
  retrieveTitleValues
} from "../../../utilities/utilityQueries";
import axios from "axios";

class FormPersonal extends Component {
  constructor(props) {
    super(props);
    // Create the ref
    this.inputHiddenRef = React.createRef();
    this.state = {
      instantMessagingNameValues: []
    };
  }

  getInstantMessagingNameValues() {
    return ["Google", "Skype", "Yahoo"];
  }

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchGenders();
    this.props.fetchTitleProperties();
    this.setState({
      instantMessagingNameValues: this.getInstantMessagingNameValues()
    });
  }

  handleInputChange = (e, secondLevel) => {
    this.props.updateAboutPerson({
      id: e.target.id,
      value: e.target.value,
      secondLevel
    });
  };

  handleSelectChange = (name, value, secondLevel) => {
    this.props.updateAboutPerson({
      id: name,
      value: value["@type"],
      secondLevel
    });
  };

  handleMultiSelectChange = (name, value) => {
    let myarr = [];
    let length = value.length;
    for (let i = 0; i < length; i++) {
      myarr.push(value[i]["@type"]);
    }
    this.props.updateAboutPerson({ id: name, value: myarr });
  };

  handleRadioChange = e => {
    this.props.updateAboutPerson({ id: e.target.name, value: e.target.id });
  };

  addTelephoneNumber = id => {
    let phones = [...this.props.aboutperson["my0:hasTelephoneNumber"], ""];
    this.props.updateAboutPerson({ id: id, value: phones });
  };

  updateTelephoneNumber = (e, id, index) => {
    let phones = [...this.props.aboutperson["my0:hasTelephoneNumber"]];
    phones[index] = e.target.value;
    this.props.updateAboutPerson({ id: id, value: phones });
  };

  removeTelephoneNumber = (id, index) => {
    let phones = this.props.aboutperson["my0:hasTelephoneNumber"].filter(
      (item, ind) => ind !== index
    );
    this.props.updateAboutPerson({ id: id, value: phones });
  };

  addInstantMessaging = id => {
    this.props.createIM();
  };

  updateInstantMessaging = (name, value, index) => {
    this.props.updateIM({ id: index, name: name, value: value });
  };

  removeInstantMessaging = index => {
    this.props.removeIM(index);
  };

  handleAddPhotoClick = () => {
    this.inputHiddenRef.click();
  };

  onChangePhotoUpload = async e => {
    let file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload_photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(resp => {
        this.props.updateAboutPerson({
          id: "photo",
          value: resp.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  clearPhotoUpload = () => {
    this.props.updateAboutPerson({
      id: "photo",
      value: ""
    });
  };

  render() {
    let {
      "my0:firstName": firstName,
      "my0:lastName": lastName,
      "my0:hasCitizenship": hasCitizenship,
      "my0:hasNationality": hasNationality,
      "my0:website": website,
      "my0:dateOfBirth": dateOfBirth,
      "my0:gender": gender,
      "my0:hasTelephoneNumber": hasTelephoneNumber,
      "my0:email": email,
      "my0:title": title,
      "my0:driversLicence": driversLicence,
      "my0:address": address,
      "my0:photo": photo
    } = this.props.aboutperson;

    let instantMessaging = this.props.aboutperson["my0:hasInstantMessaging"];

    return (
      <Row className="main-content-row">
        <Col md={3}>
          <h4 style={{ marginTop: "10px" }}>Personal Information</h4>
          <div className="photo-div-container" width="250px"
                  height="300px">
            {photo ? (
              <React.Fragment>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  onClick={this.clearPhotoUpload}
                />
                <img
                  src={"../../static/media/photos/" + photo}
                  width="250px"
                  height="300px"
                  alt="Person's Photo"
                ></img>
              </React.Fragment>
            ) : (
              <div className="photo-div">
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "0"
                  }}
                >
                  Photo
                </p>
                <div className="photo-div-button">
                  <AddButton
                    handleClick={this.handleAddPhotoClick}
                    classnames="add-button"
                  />
                  <input
                    onChange={this.onChangePhotoUpload}
                    ref={inputHiddenRef =>
                      (this.inputHiddenRef = inputHiddenRef)
                    }
                    type="file"
                    hidden
                  />
                </div>
              </div>
            )}
          </div>
          <div
            class="alert alert-warning"
            style={{ margin: 0, padding: '10px', fontSize: '14px', marginTop: '15px', maxWidth: '250px' }}
            role="alert"
          >
             Accepted formats: PNG, JPG.
             <br/>
             Max. size: 1MB. 
          </div>
          <CustomRadioGroup
            items={this.props.genders}
            name="gender"
            value={gender}
            handleChange={this.handleRadioChange}
          />
        </Col>
        <Col md={4} className="pt-4">
          <label className="label-rw">Title</label>
          <Combobox
            name="title"
            placeholder="Select title"
            data={this.props.titles}
            textField="value"
            valueField="@type"
            value={title}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value => this.handleSelectChange("title", value)}
          />
          <div className="row">
            <div className="col col-sm-6">
              <CustomInput
                id="firstName"
                label="First name"
                type="text"
                value={firstName}
                handleChange={this.handleInputChange}
              />
            </div>
            <div className="col col-sm-6">
              <CustomInput
                id="lastName"
                label="Last name"
                type="text"
                value={lastName}
                handleChange={this.handleInputChange}
              />
            </div>
          </div>
          <CustomInput
            id="email"
            label="E-mail"
            type="email"
            value={email}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="website"
            label="Website"
            type="text"
            value={website}
            handleChange={this.handleInputChange}
          />
          <div>
            <CustomInput
              id="street"
              label="Street name + number"
              type="text"
              value={address["my0:street"]}
              handleChange={e => this.handleInputChange(e, "address")}
            />
            <Row>
              <Col md={6}>
                <CustomInput
                  id="postalCode"
                  label="Postal Code"
                  type="text"
                  value={address["my0:postalCode"]}
                  handleChange={e => this.handleInputChange(e, "address")}
                />
              </Col>
              <Col md={6}>
                <CustomInput
                  id="city"
                  label="City"
                  type="text"
                  value={address["my0:city"]}
                  handleChange={e => this.handleInputChange(e, "address")}
                />
              </Col>
            </Row>
            <label className="label-rw">Country</label>
            <Combobox
              name="country"
              placeholder="Select a country"
              data={this.props.countries}
              textField="value"
              valueField="@type"
              value={address["my0:country"]}
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange("country", value, "address")
              }
            />
          </div>
          <CustomInput
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            handleChange={this.handleInputChange}
          />
          <label className="label-rw">Citizenship</label>
          <Multiselect
            name="hasCitizenship"
            data={this.props.countries}
            textField="value"
            valueField="@type"
            value={hasCitizenship}
            placeholder="Select a country"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("hasCitizenship", value)
            }
          />
          <label className="label-rw">Nationality</label>
          <Multiselect
            name="hasNationality"
            data={this.props.countries}
            textField="value"
            valueField="@type"
            value={hasNationality}
            placeholder="Select a country"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("hasNationality", value)
            }
          />
          <CustomInput
            id="driversLicence"
            label="Driver's License"
            type="text"
            value={driversLicence}
            handleChange={this.handleInputChange}
          />
          <div className="mb-3" />
          <Row className="m-0">
            <Col md={5} className="p-0">
              <p className="mb-0">Telephone Numbers</p>
            </Col>
            <Col md={5} className="p-0" />
            <Col md={2} className="p-0 instant-add-wrapper">
              <AddButton
                classnames="add-button small-button"
                handleClick={() =>
                  this.addTelephoneNumber("hasTelephoneNumber")
                }
              />
            </Col>
          </Row>
          {hasTelephoneNumber.map((member, index) => (
            <Row key={index}>
              <Col md={11} className="pr-0">
                <CustomInput
                  id="hasTelephoneNumber"
                  label="Phone number"
                  type="text"
                  value={member}
                  handleChange={e =>
                    this.updateTelephoneNumber(e, "hasTelephoneNumber", index)
                  }
                />
              </Col>
              <Col md={1}>
                <RemoveButton
                  classnames="shift-left"
                  handleClick={() =>
                    this.removeTelephoneNumber("hasTelephoneNumber", index)
                  }
                />
              </Col>
            </Row>
          ))}
          <div className="mb-3" />
          <Row className="m-0">
            <Col md={5} className="p-0">
              <p className="mb-0">Instant Messaging</p>
            </Col>
            <Col md={5} className="p-0" />
            <Col md={2} className="p-0 instant-add-wrapper">
              <AddButton
                classnames="add-button small-button"
                handleClick={() =>
                  this.addInstantMessaging("hasInstantMessaging")
                }
              />
            </Col>
          </Row>

          {instantMessaging.map((member, index) => (
            <Row key={index}>
              <Col md={6} className="pr-0">
                <div style={{ marginTop: "22px" }}>
                  <Combobox
                    name="instantMessagingName"
                    data={this.state.instantMessagingNameValues}
                    value={member["my0:instantMessagingName"]}
                    placeholder="Select an IM Name"
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.updateInstantMessaging(
                        "my0:instantMessagingName",
                        value,
                        index
                      )
                    }
                  />
                </div>
              </Col>
              <Col md={5} style={{ marginTop: "7px" }}>
                <CustomInput
                  id="my0:instantMessagingUsername"
                  label="Username"
                  type="text"
                  value={member["my0:instantMessagingUsername"]}
                  handleChange={e =>
                    this.updateInstantMessaging(
                      "my0:instantMessagingUsername",
                      e.target.value,
                      index
                    )
                  }
                />
              </Col>
              <Col md={1}>
                <RemoveButton
                  classnames="shift-left"
                  handleClick={() => this.removeInstantMessaging(index)}
                />
              </Col>
            </Row>
          ))}
        </Col>
        <Col md={5}> </Col>
      </Row>
    );
  }
}

const mapstateToProps = state => {
  return {
    countries: retrieveCountryValues(state.utility.countryValues),
    genders: retrieveGenderValues(state.utility.genderValues),
    titles: retrieveTitleValues(state.utility.titleValues),
    aboutperson: state.cv["my0:aboutPerson"]
  };
};

export default connect(
  mapstateToProps,
  {
    fetchCountries,
    updateAboutPerson,
    fetchGenders,
    fetchTitleProperties,
    createIM,
    updateIM,
    removeIM
  }
)(FormPersonal);
