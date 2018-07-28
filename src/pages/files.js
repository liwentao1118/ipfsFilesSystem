import React, {Component} from 'react';
import ipfsAPI from 'ipfs-api';
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

class Files extends Component {
    constructor(props) {
        super(props);
        this.state=({
            filesName:[]
        })
    }

    render() {
        const {filesName}=this.state
        return (
            <div>
                <h2>文件文件夹操作</h2>
                <div>
                    <h3>查看路径</h3>
                    <input type="text" placeholder="请输入路径" ref={input=>this.inputNode=input}/>
                    <button onClick={()=>{
                        let value = this.inputNode.value;
                        value= value||'/'
                        ipfs.files.ls(value,(err,files)=>{
                            if(err){
                                throw err
                            }
                            let filesName = files.map((file, index)=>{
                                return file.name
                            });
                            this.setState({
                                filesName:filesName
                            })
                        })
                    }}>查看文件/文件夹</button>
                    <button onClick={()=>{
                        let value = this.inputNode.value
                        
                        value = value||'/'
                        console.log(value)
                        ipfs.files.stat(value,(err,stats)=>{
                            console.log(stats.hash)
                            this.setState({filesName:[stats.hash]})
                        })
                    }}>查看hash</button>
                    <ul>
                        {filesName.map((file,index)=>{
                            return <li key={index}>{index}~~{file}</li>
                        })}
                    </ul>
                </div>
                <div>
                    <h3>复制到路径</h3>
                    <input  placeholder='dir,hash,file' ref={input=>this.srcInput=input} />
                    <input  placeholder='distpath' ref={input=>this.distInput=input} />
                    <button onClick={()=>{
                        let opath = this.srcInput.value
                        let distpath= this.distInput.value
                        ipfs.files.cp(opath,distpath,(err)=>{
                            if (err){
                                throw err
                            }
                            console.log('copy successful')
                        })
                    }}>执行复制</button>
                </div>
                <div>
                    <h3>删除路径</h3>
                    <input type="text" placeholder='请输入路径' ref={input=>this.delinput=input}/>
                    <button onClick={()=>{
                        let value= this.delinput.value
                        ipfs.files.rm(value,(err)=>{
                            if (err){
                                throw err
                            }
                            console.log('delete successful')
                        })
                    }}>执行删除</button>
                </div>

            </div>
        )
    }
}


export default Files;
