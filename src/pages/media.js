import React, {Component} from 'react';
import {addFile} from '../utils/ipfsUtil'

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            hash: '',
            inputhash: ""
        })
    }

    render() {
        const {hash, inputhash} = this.state
        return (
            <div>
                <div>
                    <h2>多媒体获取&&上传</h2>
                    <fieldset>
                        <legend>请选择文件</legend>
                        <input type="file" multiple ref={input => this.mediainput = input}/>
                    </fieldset>
                    <button onClick={() => {
                        let file = this.mediainput.files[0]
                        addFile(file).then(hash => {
                            this.setState({hash, inputhash: hash})
                        }).catch(err => console.error(err))
                    }}>提交
                    </button>
                    {
                        hash && <p>多媒体hash:{hash}</p>
                    }
                </div>
                <div>
                    <h2>多媒体播放</h2>
                    <input type="text" placeholder='请输入多媒体的hash' value={inputhash} onChange={e => {
                        this.setState({hash: e.target.value})
                    }
                    }/>
                    <button onClick={()=>{
                        this.setState({hash:inputhash})
                    }}>播放多媒体</button>
                    {hash&&<video controls src={`http://localhost:8080/ipfs/${hash}`}></video>}

                </div>
            </div>
        );
    }
}


export default Media;
