import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../Context';

class User extends Component {
  state = {
    isVisible: true
  }

  static defaultProps = {
    name: "Bilgi Yok",
    salary: "Bilgi Yok",
    department: "Bilgi Yok"
  }

  onClickEvent = (e) => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  onDeleteUser = (dispatch, e) => {
    const { id } = this.props;
    // dispatch'in içerisinde bir tane action oluşturuyoruz. 
    dispatch({ type: "DELETE_USER", payload: id });
  }

  // cwun - yazınca çıkar.  
  componentWillUnmount() {
    console.log("component Will Unmount");
    // User.js'yi kaldırdığımız zaman kaldırmadan hemen önce bu metot çalışacak. 
  }


  render() {


    const { name, salary, department } = this.props;
    const { isVisible } = this.state;
    return (
      <UserConsumer>
        {
          value => {
            const { dispatch } = value; // Value'daki dispatch değerini değişken olarak alıyoruz. Ve bunu aşağıda delete'e clik olduğunda
            // onDeleteUser fonksiyonuna göndereceğiz.

            return (
              <div className='container' style={{ display: "flex", justifyContent: "center" }}>
                <div className='col-md-8 mb-4'>
                  <div className='card' >
                    <div className='card-header d-flex justify-content-between' style={isVisible ? { backgroundColor: "#466369", color: "white" } : null}>
                      <h4 className='d-inline' onClick={this.onClickEvent}>{name}</h4>
                      {/* <button onClick={this.onDeleteUser.bind(this, dispatch)}>Delete</button> */}
                      <button onClick={this.onDeleteUser.bind(this,dispatch)} className="btn" style={{cursor : "pointer"}}>Delete</button>
                      {/* <i onClick={this.onDeleteUser.bind(this,dispatch)} className="btn btn-primary" style={{cursor : "pointer"}}></i>   */}

                    </div>

                    {
                      isVisible ? <div className='card-body' style={isVisible ? { backgroundColor: "#83aeb7", color: "white" } : null}>
                        <p className='card-text'>Salary : {salary}</p>
                        <p className='card-text'>Department : {department}</p>
                      </div> : null
                    }

                  </div>

                </div>
              </div>
            )
          }
        }
      </UserConsumer>
    )
  }
}

User.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  salary: PropTypes.string,
  department: PropTypes.string 
}

export default User;
