import React, {Component} from 'react';
import ipfsApi from 'ipfs-api'
const ipfs = ipfsApi({host:'localhost',port:'5001',protocol:'http'})
class Pic extends Component {
    constructor(props) {
        super(props);
        this.state=({
            hash:'',
            inputhash:''
        })
    }

    render() {
        const {hash,inputhash} = this.state
        return (
            <div>
                <h2>图片上传及获取</h2>
                <div>
                  <fieldset>
                      <legend>请选择文件</legend>
                      <input type="file" multiple ref={input =>this.fileInput=input}/>
                  </fieldset>
                    <button onClick={()=>{
                        let files = this.fileInput.files;
                        let fr = new FileReader()
                        fr.onload=()=>{
                            let data = Buffer.from(fr.result);
                            ipfs.files.add(data,(err,files)=>{
                                if (err){
                                    throw err
                                }
                                console.log(files)
                                this.setState({hash:files[0].hash,inputhash:files[0].hash})
                            })
                        }
                        fr.readAsArrayBuffer(files[0])
                    }}>上传</button>
                    {hash&&<p>图片hash:{hash}</p>}
                </div>
                <div>
                    <h3>图片获取</h3>
                    <input type="text" placeholder='请输入图片hash' value={inputhash} onChange={(e)=>{this.setState({inputhash:e.target.value})}}/>
                    <button onClick={()=>{
                        this.setState({hash:inputhash})
                    }}>获取</button>
                    {
                        hash&& <img src={`http://127.0.0.1:8080/ipfs/${hash}`} alt="图片"/>
                    }
                </div>
            </div>
        );
    }
}


export default Pic;
