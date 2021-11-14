import React, {Component} from 'react';
import './App.css';
import TOC from "./components/TOC";
import Content from './components/Content';
import Subject from './components/Subject';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: "read",
      selectedContentId: 2,
      subject: {title: "HaveANiceDay!", sub: "Enjoy your Life"},
      welcom: {title: "Welcome", desc: "Hello, JH!"},
      read: {title: "Hi ~", desc: "Click WEB!!"},
      contents: [
        {id:1, title:"HTML", desc:"HeyHey"},
        {id:2, title:"CSS", desc:"HeyHey2"},
        {id:3, title:"JS", desc:"HeyHey3"}
      ]
    }
  }

  render () {
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcom.title;
      _desc = this.state.welcom.desc;
    }else if(this.state.mode === 'read'){
      var i = 0; // 필터로 바꿔보기
      while( i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selectedContentId){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode: "welcome"
            });
          }.bind(this)}
        >
        </Subject>

        <TOC onChangePage={function(id){
          this.setState({
            mode: "read",
            selectedContentId: Number(id)
          });
        }.bind(this) } data={this.state.contents}></TOC>
        
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
