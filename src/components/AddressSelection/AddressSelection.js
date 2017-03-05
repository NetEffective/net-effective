import React, {Component, PropTypes} from 'react';

class AddressSelection extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      address: null,
      name: null,
    };
  }

  handleNameChange() {
    this.setState({name: this.nameInput.value});
  }

  handleAddressChange() {
    this.setState({address: this.addressInput.value});
  }

  handleSubmit(event) {
    const {name, address} = this.state;
    event.preventDefault();
    this.props.onSubmit(name, address);
  }

  render() {
    return (
      <div>
        <form className="form-horizontal"
              onSubmit={(e) => this.handleSubmit(e)}
        >
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2">Name: </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="name"
                ref={ref => {this.nameInput = ref;}}
                value={this.state.name}
                onChange={() => this.handleNameChange()}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="col-sm-2">Address: </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="name"
                value={this.state.address}
                ref={(ref) => {this.addressInput = ref;}}
                onChange={() => this.handleAddressChange()}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                className="btn btn-success"
                type="submit"
              >
                <i className="fa fa-paper-plane"/> Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddressSelection;
