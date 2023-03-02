import React, { Component } from 'react'

// Constructor (Yapıcı) bu componenet'ımız oluşturulmaya başlandığı zaman çalışan metottur. 

class Test extends Component {
    constructor (props) {
        super(props);
        this.state = {
            a:10
        }
        console.log("Constructor");

    }

    //componentDidMount -> Bu component'imiz mount edildikten hemen sonra çalışır.
    componentDidMount () {
      console.log("componentDidMount");
      this.setState({
        a:20
      })
    }


    // cdup - yazınca direk geliyor
    // componentDidUpdate -> günellemeden hemen sonra çalışır.
    // Güncelleme işlemimiz - state değiştiğinde veya props değiştiğinde veya forceUpdate olduğunda tekrardan render fonksiyonu çalışıyor
    componentDidUpdate = (prevProps, prevState) => {
      console.log("componentDidUpdate");
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate");
        return true;
        // Burada false dönersek render ve componentDidUpdate çalışmayacak. shouldComponentUpdate'ten sonraki hiçbir şey çalışmayacaktı.
    }
    
    
  render() {
    // Render -> Bu componenet'ımız sayfaya mount edilirken çalışır.
    console.log("Render");
    return (
      <div>
        
      </div>
    )
  }
}
export default Test;