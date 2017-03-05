import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'address-form',
  fields: ['name', 'address']
})
export default
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

  render() {
    const {
      fields: {address},
      handleSubmit
    } = this.props;
    function onChange(event) {
      const newText = event.target.value;
      this.setState({field: newText});
    }
    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8'}>
          <input type="text" className="form-control" id={field.name} {...field} onChange={onChange}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(address, 'Address')}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
