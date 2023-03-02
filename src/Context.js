import React, { Component } from 'react'
import axios from 'axios';

// Bu yapı bize provider ve consumer verecek
const UserContext = React.createContext();

const reducer = (state,action) => { 
  // Reducer'da buradaki switch case yapısıyla action.type'ı kontrol ediyor. Eğer DELETE_USER ise altındaki return çalışıyor.
  // return içerisinde; ...state ile eski state'imizi koyduk. altında da o state içerisindeki güncellenmiş users var. Yani yeni state
  // bu şekilde return ediliyor.
  switch(action.type) {
    case "DELETE_USER":
        return{
          ...state,
          // users : state.users.filter(user => user.id !== action.payload)
          users : state.users.filter(user => user.id !== action.payload)
        }
    case "ADD_USER":
      return{
        ...state,
        users : [...state.users,action.payload] // payload'da newUser var.
      }
    default:
      return state
  }
}

export  class UserProvider extends Component {
    state = {
        users : [],
        // alt componenet'lardan bir tane action gelecek: Bu action'ı Reducer'a göndereceğiz, bu Reducer'dan güncellenmiş state gelecek,
        // setState ile güncelleme işlemine yapacağız.
        dispatch : action => {
          this.setState(state => reducer(state,action))
          // reducer(state,action) - buradaki state önceki state'imiz. Dispatch ile aldığımız action'ı state'le birlikte reducer'a gönderiyoruz.
          // Reducer'a git.
          // reducer'da return ettiğimizde yeni state'imiz buraya geliyor. Yeni state geldiği zaman setState içerisine alarak
          // güncellemiş oluyoruz. 
        }
      }
    
    componentDidMount = async () => { 
      const response = await axios.get("http://localhost:3001/users") // await kullanmamızın sebebi: buradaki veri dönene kadar beklemeyi sağlaması. 
      // await işlemi bitip verimiz geldikten sonra bize response şeklinde bir yapı dönecek. Yani verimizi response içinden alabileceğiz.
      // Response bir obje.Objenin içerisindeki data kısmında bizim db.json'a yazdığımız 3 verimiz bulunuyor. response.data dediğimizde
      // verimizi alacağız.Bu veriyi state'in içindeki users'a güncellemek için kullanacağız.


      // state'in içerisindeki users'ı güncellemek için setState
      this.setState({
        users: response.data
      })
    }
    


  render() {
    return (
      <UserContext.Provider value={this.state}>

        {/* İleride UserProvider'ın altına App'i koyacağımız için bunu temsil etmesi açısından:
        Burada props göndermedik aslında ama otomatik olarak React children props'u gönderiyor  */}

        {this.props.children}

      </UserContext.Provider>
    )
  }
}

const UserConsumer = UserContext.Consumer;

export default UserConsumer; // Diğerdosyalarda kullanmak için export (ihraç etmek - dışarıya göndermek) ediyoruz.