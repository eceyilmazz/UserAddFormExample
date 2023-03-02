import posed from 'react-pose';
import React, { Component } from 'react'
import UserConsumer from '../Context';
var uniqid = require('uniqid'); // Benzersiz id oluşturmak için npmjs.com/package/uniqid sitesinden alındı. install işlemi de yapıldı

const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none"
        }
    }
});

class AddUser extends Component {
    state = {
        visible: true,
        name: "",
        department: "",
        salary: ""
    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }
    changeInput = (e) => {
        this.setState({
            // inputtaki name özelliğini alıcaz örnepin name = "name" ise aşağıdaki [..] ifade name, name="department" = [department] olmuş olacak
            [e.target.name]: e.target.value
        })
    }

    addUser = (dispatch, e) => {
        e.preventDefault(); // Form'un default davranışında add user butonuna bastıktan sonra sayfayı yenilemek var. Bunu önlememiz gerek.
        const { name, department, salary } = this.state;

        // Yeni bir obje oluşturuyoruz:
        const newUser = {
            id: uniqid(),
            name: name, // Yukarıda this.state ile aldığımız name 
            department: department,
            salary: salary

        }
        dispatch({ type: "ADD_USER", payload: newUser });
    }

    render() {
        const { visible, name, department, salary } = this.state;

        return (
            <UserConsumer style={{ display: "flex", justifyContent: "center" }}>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className='container' style={{ display: "flex", justifyContent: "center" }}>
                                <div className='col-md-8 mb-4'>
                                    <button onClick={this.changeVisibility} className='btn btn-dark btn-block mb-2'>{visible ? 'Hide Form' : 'Show Form'}</button>

                                    <Animation pose={visible ? "visible" : "hidden"}>
                                        <div className='card' >
                                            <div className='card-header'>
                                                <h4>Add User Form</h4>
                                            </div>
                                            <div className='card-body'>
                                                <form onSubmit={this.addUser.bind(this, dispatch)}>
                                                    <div className='form-group'>
                                                        <label htmlFor='name'>Name</label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            name='name'
                                                            id='id'
                                                            placeholder='Enter Name'
                                                            className='form-control'
                                                            value={name}
                                                            onChange={this.changeInput} />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='department'>Department</label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            name='department'
                                                            id='department'
                                                            placeholder='Enter Department'
                                                            className='form-control'
                                                            value={department}
                                                            onChange={this.changeInput} />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='salary'>Salary</label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            name='salary'
                                                            id='salary'
                                                            placeholder='Enter Salary'
                                                            className='form-control'
                                                            value={salary}
                                                            onChange={this.changeInput} />
                                                    </div>

                                                    <button className="btn btn-block" type='submit' >Add User</button>

                                                </form>

                                            </div>

                                        </div>
                                    </Animation>
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )




    }
}
export default AddUser;