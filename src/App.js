import React, {Component} from 'react';
import './App.css';
import TOC from "./components/TOC";
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props){
    super(props);
    this.maxContentId = 3;
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
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcom.title;
      _desc = this.state.welcom.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
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
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // Add New contents
        this.maxContentId = this.maxContentId + 1;
        
        var _contents = this.state.contents.concat(
          {id: this.maxContentId, title: _title, desc: _desc}
        );

        this.setState({
          contents: _contents
        });

      }.bind(this)}></CreateContent>;
    }else if(this.state.mode === 'update'){
      _article = <UpdateContent></UpdateContent>;
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
        <Control onChangeMode={function(mode){
          this.setState({
            mode: mode
          })
        }.bind(this)}></Control>
        {_article}
        
      </div>
    );
  }
}

export default App;
