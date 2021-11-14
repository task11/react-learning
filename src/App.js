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
      mode: "welcome",
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

  getReadContent () {
      var i = 0; // 필터로 바꿔보기
      while( i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selectedContentId){
          return data;
          break;
        }
        i = i + 1;
      }
  }

  getContent () {
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcom.title;
      _desc = this.state.welcom.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // Add New contents
        this.maxContentId = this.maxContentId + 1;
        
        var _contents = Array.from(this.state.contents)
        _contents.push(
          {id: this.maxContentId, title: _title, desc: _desc}
        );

        this.setState({
          contents: _contents,
          mode: "read",
          selectedContentId: this.maxContentId
        });

      }.bind(this)}></CreateContent>;
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        // Add New contents
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id: _id, title: _title, desc: _desc};
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents: _contents
        });
        this.setState({
          contents:_contents,
          mode: "read"
        });
      }.bind(this)}></UpdateContent>;
    }
    return _article;
  }

  render () {
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
          }.bind(this) }
          data={this.state.contents}>

        </TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === "delete"){
            if(window.confirm("정말 삭제하시겠습니까?")){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < this.state.contents.length){
                if(_contents[i].id === this.state.selectedContentId){
                  _contents.splice(i,1); // 배열의 id 값 한칸
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode: "welcome",
                contents: _contents
              });
              alert("삭제가 완료되었습니다.");
            }
          } else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
        
      </div>
    );
  }
}

export default App;
