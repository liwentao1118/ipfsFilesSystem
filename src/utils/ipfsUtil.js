import ipfsAPI from 'ipfs-api';

const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

const addFile = (file) => {
    return new Promise((resolve, reject) => {
        let fr = new FileReader()
        fr.onload=()=>{
        let data = Buffer.from(fr.result)

        ipfs.files.add(data).then(files => {
                resolve(files[0].hash)
            }
        ).catch(e=>reject(e))

        }
        fr.readAsArrayBuffer(file)
    })

}
export {addFile}