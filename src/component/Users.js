import React, { Component } from 'react'
import User from './User';
import UserConsumer from '../Context';

class Users extends Component {
  render() {

    return (
      <UserConsumer>
        {
          value => { // value = this.state,    
            const { users } = value; // value içerisindeki users'ı aldık
            return (
              <div>
                {
                  users.map(user => {
                    return (
                      <User
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        salary={user.salary}
                        department={user.department}
                      ></User>
                    )
                  })
                }

              </div>
            )
          }
        }
      </UserConsumer>
    )
  }
}
export default Users;