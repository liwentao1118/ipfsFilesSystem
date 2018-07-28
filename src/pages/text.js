import React, {Component} from 'react';
import ipfsApi from 'ipfs-api'
const ipfs = ipfsApi({host:'localhost',port:'5001',protocol:'http'})

class Text extends Component {
    constructor(props) {
        super(props);
        this.state=({
            hash:'',
            peerid:'',
            inputhash:''

        })

    }

    componentDidMount() {
        ipfs.id((err,identify)=>{
            if(err){
                throw err
            }
            console.log(identify.id)
            this.setState({peerid:identify.id})
        })
    }


    render() {
        const {hash,inputhash,peerid} = this.state
        return (
            <div>
                <h2>文本上传及获取</h2>
                <p>当前ipfs节点是{peerid}</p>
                <div>

                    <h3>文本上传</h3>
                    <textarea ref={input=>this.inputNode=input}></textarea>
                    <button onClick={()=>{
                        let data = Buffer.from(this.inputNode.value,'utf-8')
                        ipfs.files.add(data,(err,files)=>{
                            if (err){
                                throw err
                            }
                            console.log(files)
                            this.setState({hash:files[0].hash,inputhash:files[0].hash})

                        })

                    }}>添加</button>
                    <p>当前hash是{hash}</p>
                </div>
                <div>
                    <h3>文本获取</h3>
                    <textarea name="" disabled id="" cols="30" rows="10" ref='outputArea'/><br/>
                    <input type="text" placeholder='请输入hash值' value={inputhash} onChange={(e)=>{
                        this.setState({inputhash:e.target.value})
                    }}/>
                    <button onClick={()=>{
                        console.log(this.refs.outputArea)
                        ipfs.files.cat(inputhash,(err,file)=>{
                            if (err) {
                                throw err
                            }
                            this.refs.outputArea.value=file.toString('utf-8')
                            console.log(this.refs.outputArea.value)

                        })

                    }}>获取</button>
                </div>
            </div>
        )
    }
}


export default Text;
