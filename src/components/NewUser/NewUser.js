import React, { Component } from "react";

import Label from "../Label";
import Input from "../Input";
import GenderSelector from "../GenderSelector";
import Button from "../Button";
import User from "../../models/User";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new User(),
      validation: {
        invalidName: false,
        invalidGender: false
      }
    };
  }

  updateUserName = event => {
    let user = this.state.user;
    user.name = event.target.value;
    this.setState({
      user: user
    });
  };

  updateUserGender = (event, gender) => {
    event.preventDefault();
    let user = this.state.user;
    user.gender = gender;
    this.setState({
      user: user
    });
  };

  valid = e => {
    e.preventDefault();
    let user = this.state.user;
    let validation = this.state.validation;

    validation.invalidName = !user.validName();
    validation.invalidGender = !user.validGender();

    this.setState({
      validation: validation
    });
  };

  render() {
    return (
      <div className="center">
        <form className="pure-form pure-form-stacked">
          <Label
            htmlFor="name"
            text="Quem é você?"
            invalidValue={this.state.validation.invalidName}
          />
          <Input
            id="name"
            placeholder="Digite seu nome"
            maxLength="40"
            readOnly={false}
            invalidValue={this.state.validation.invalidName}
            defaultValue={this.state.user.name}
            onChange={this.updateUserName}
          />
          <Label
            text="Seu gênero:"
            invalidValue={this.state.validation.invalidGender}
          />
          <GenderSelector
            invalidValue={this.state.validation.invalidGender}
            gender={this.state.user.gender}
            updateGender={this.updateUserGender}
          />
          <Button main text="Próximo" onClick={this.valid} />
        </form>
      </div>
    );
  }
}

export default NewUser;
