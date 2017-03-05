import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'address-form',
  fields: ['name', 'address']
})

class AddressSelection extends Component {
  static propTypes = {
    active: PropTypes.string,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  onChange(event) {
    this.setState({field: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    // {/*field.error && field.touched && <div className="text-danger">{field.error}</div>*/}
  }

  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2">Name: </label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="name" onChange={this.onChange.bind(this)}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="col-sm-2">Address: </label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="name" onChange={this.onChange.bind(this)}/>
            </div>
          </div>;

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" type="submit">
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
