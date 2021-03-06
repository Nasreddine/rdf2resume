import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { Combobox } from "react-widgets";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomTextarea from "../../../../core/CustomTextarea";
import { createOtherSkill, updateOtherSkill, updateCVLastUpdate } from "../../../../../actions";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import {
  fetchMainPropertiess,
  fetchSkillCategories,
  fetchSkillSuggestion,
  updateLanguage
} from "../../../../../actions/utilityActions";
import {
  retrieveMainProperties,
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";
import {
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel,
  successTitle
} from "../../../../../translations/translations";
import CustomLevelButton from "../../../../core/CustomLevelButton";
import {
  skillAddTitle,
  skillUpdateTitle
} from "../../../../../translations/translations";
import { ListItem, languages } from "../../../../core/LanguageToggle";

class SkillModal extends Component {
  state = {
    language: '',
    otherSkill: {
      "@type": "my0:Skill",
      "my0:skillName": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
      ],
      "my0:skillDescription": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
      ],
      "my0:skillCategory": "",
      "my0:skillLevel": "",
      "my0:skillHasCertificate": true,
      "my0:skillCertificateName": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
      ]
    }
  };

  componentWillMount() {
    this.setInitialValues();
    this.props.fetchSkillCategories();
    this.props.fetchMainPropertiess("my0:Skill");
    this.props.fetchSkillSuggestion();
    this.setState({
      language: this.props.language
    })
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let otherSkill = { ...this.state.otherSkill };
      otherSkill["my0:skillName"] = inputRef["my0:skillName"];
      otherSkill["my0:skillCategory"] = inputRef["my0:skillCategory"];
      otherSkill["my0:skillDescription"] = inputRef["my0:skillDescription"];
      otherSkill["my0:skillLevel"] = inputRef["my0:skillLevel"];
      otherSkill["my0:skillHasCertificate"] =
        inputRef["my0:skillHasCertificate"];
      otherSkill["my0:skillCertificateName"] =
        inputRef["my0:skillCertificateName"];
      this.setState({
        otherSkill
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        otherSkill: {
          "@type": "my0:Skill",
          "my0:skillName": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ],
          "my0:skillDescription": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ],
          "my0:skillCategory": "",
          "my0:skillLevel": "",
          "my0:skillHasCertificate": true,
          "my0:skillCertificateName": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ]
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleCheckboxChange = e => {
    let otherSkill = { ...this.state.otherSkill };
    otherSkill[e.target.id] = e.target.checked;
    this.setState({
      otherSkill
    });
  };

  replaceLanguageValue(data, language, value) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === language) {
        data[i]["@value"] = value;
        break;
      }
    }
    return data;
  }

  findTranslatedValue(data, lang) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === lang) {
        return data[i]["@value"];
      }
    }
  }

  handleInputChange = (e, lang) => {
    let label = e.target.id;
    let otherSkill = { ...this.state.otherSkill };
    if (lang) {
      otherSkill[label] = this.replaceLanguageValue(otherSkill[label], lang, e.target.value);
    } else {
      otherSkill[label] = e.target.value;
    }
    this.setState({
      otherSkill
    });
  };

  handleSelectChange = (value, id) => {
    let obj = { ...this.state.otherSkill };
    let label = id;
    obj[label] = value["@type"];
    this.setState({
      otherSkill: obj
    });
  };

  handleSave = e => {
    e.preventDefault();
    this.props.createOtherSkill(this.state.otherSkill);
    this.props.updateCVLastUpdate();
    this.props.onHide();
    Swal.fire({
      title: successTitle[this.props.language],
      type: "success",
      confirmButtonColor: "#4bb3cc",
      heightAuto: false,
      confirmButtonText: "Okay"
    });
  };

  handleUpdate = e => {
    this.props.updateOtherSkill({
      object: this.state.otherSkill,
      index: this.props.id
    });
    this.props.updateCVLastUpdate();
    this.props.onHide();
    Swal.fire({
      title: successTitle[this.props.language],
      type: "success",
      confirmButtonColor: "#4bb3cc",
      heightAuto: false,
      confirmButtonText: "Okay"
    });
  };

  handleRenderingSubmitButton = lang => {
    let isDisabled =
      this.state.otherSkill["my0:skillName"] === "" ||
      this.state.otherSkill["my0:skillCategory"] === "" ||
      this.state.otherSkill["my0:skillLevel"] === "";
    if (!this.props.isUpdate) {
      return (
        <Button
          disabled={isDisabled}
          type="submit"
          variant="primary"
          onClick={this.handleSave}
        >
          {saveLabel[lang]}
        </Button>
      );
    } else {
      return (
        <Button
          disabled={isDisabled}
          type="submit"
          variant="primary"
          onClick={this.handleUpdate}
        >
          {updateLabel[lang]}
        </Button>
      );
    }
  };

  findInArray(data, name) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      let index = data[i]["@type"].indexOf(name);
      let newlength = data[i]["@type"].length;
      if (index >= 0 && index + name.length >= newlength) {
        return i;
      }
    }
  }

  renderLabel(translated, name, lang) {
    let index = this.findInArray(translated, name);
    if (
      translated[index] === undefined ||
      translated[index][lang] === undefined
    ) {
      return name;
    } else {
      return translated[index][lang];
    }
  }

  handleLevelClick = e => {
    let label = "my0:skillLevel";
    let otherSkill = { ...this.state.otherSkill };
    otherSkill[label] = e.target.id;
    this.setState({
      otherSkill
    });
  };

  handleSkillSuggestion = (value, id, language) => {
    this.props.fetchSkillSuggestion(value, language);
    let obj = { ...this.state.otherSkill };
    let label = id;
    obj[label] = this.replaceLanguageValue(obj[label], language, value["title"]);
    // obj[label] = value["title"];
    this.setState({
      otherSkill: obj
    });
  };

  render() {
    let {
      "my0:skillName": skillName,
      "my0:skillCategory": skillCategory,
      "my0:skillDescription": skillDescription,
      "my0:skillHasCertificate": skillHasCertificate,
      "my0:skillLevel": skillLevel,
      "my0:skillCertificateName": skillCertificateName
    } = this.state.otherSkill;

    let { onHide } = this.props;

    let lang = this.state.language;

    let { translatedProps } = this.props;

    let changeLanguage = (value) => this.setState({ language: value });

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={4}>
                {this.props.isUpdate
                  ? skillUpdateTitle[lang]
                  : skillAddTitle[lang]}
              </Col>
              <Col md={8} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Combobox
                name="my0:skillName"
                placeholder={
                  this.renderLabel(translatedProps, "skillName", lang) + " *"
                }
                data={this.props.skillSuggestions}
                textField="title"
                valueField="title"
                value={this.findTranslatedValue(skillName, lang)}
                caseSensitive={false}
                onChange={value =>
                  this.handleSkillSuggestion(value, "my0:skillName", lang)
                }
              />
            </Col>
            <Col md={4}>
              <label className="label-rw">
                {this.renderLabel(translatedProps, "skillLevel", lang) + " *"}
              </label>
              <CustomLevelButton
                id="my0:skillLevel"
                label="Skill Level"
                filledNumber={skillLevel}
                handleClick={this.handleLevelClick}
              />
            </Col>
          </Row>
          <Row
            style={{
              width: "100%",
              justifyContent: "left",
              marginLeft: "0px",
              marginBottom: "8px"
            }}
          >
            <label className="label-rw">
              {this.renderLabel(translatedProps, "skillCategory", lang)}
            </label>
            <Combobox
              name="my0:skillCategory"
              placeholder={
                this.renderLabel(translatedProps, "skillCategory", lang) + " *"
              }
              data={this.props.categories}
              textField={lang}
              valueField="@type"
              value={skillCategory}
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(value, "my0:skillCategory")
              }
            />
          </Row>
          <CustomTextarea
            id="my0:skillDescription"
            label={this.renderLabel(translatedProps, "skillDescription", lang)}
            value={this.findTranslatedValue(skillDescription, lang)}
            handleChange={(e) => this.handleInputChange(e, lang)}
          />
          <CustomCheckbox
            id="my0:skillHasCertificate"
            type="checkbox"
            label={this.renderLabel(
              translatedProps,
              "skillHasCertificate",
              lang
            )}
            checked={skillHasCertificate}
            handleChange={this.handleCheckboxChange}
          />
          <CustomInput
            id="my0:skillCertificateName"
            label={
              this.renderLabel(translatedProps, "skillCertificateName", lang)
            }
            type="text"
            value={this.findTranslatedValue(skillCertificateName, lang)}
            handleChange={(e) => this.handleInputChange(e, lang)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Combobox onChange={changeLanguage} value={lang} defaultValue={"en"} containerClassName="languagebox" data={languages} itemComponent={ListItem} />
          {this.handleRenderingSubmitButton(lang)}
          <Button className="btn-reset" onClick={this.clearForm}>
            {resetLabel[lang]}
          </Button>
          <Button variant="danger" onClick={onHide}>
            {cancelLabel[lang]}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv["my0:hasSkill"][ownProps.id],
    language: state.utility.language,
    categories: retrieveBaseProperties(state.utility.skillCategories),
    translatedProps: retrieveMainProperties(state.utility["my0:Skill"]),
    skillSuggestions: state.utility.skillSuggestion
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSkillCategories,
    fetchSkillSuggestion,
    createOtherSkill,
    updateOtherSkill,
    fetchMainPropertiess,
    updateCVLastUpdate,
    updateLanguage
  }
)(SkillModal);
