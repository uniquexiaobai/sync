import React, { useState, useContext } from 'react';
import { Input, Button, message } from 'antd';
import { useCopyClipboard } from '@lokibai/react-use-copy-clipboard';
import { FirebaseContext } from './context';

const createId = (len = 4) => {
    const min = 97;
    const max = 122;
    const ret = Array.from({length: len}, () => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    });

    return String.fromCharCode(...ret);
}

const { TextArea } = Input;

const Push = () => {
    const firebase = useContext(FirebaseContext);
    const [value, setValue] = useState('');
    const [isCopied, setCopied] = useCopyClipboard();

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = async () => {
        if (isCopied) return;
        
        const id = createId();
        firebase.firestore().collection('messages').doc(id).set({
            message: value,
        }).then(() => {
            setCopied(id);
            message.success(`use ${id} to pull, the id is copied`);
            console.log(id, value);
        });
    };

    return (
        <div>
            <div>
                <TextArea placeholder="Please input your message value" value={value} onChange={handleChange} />
            </div>
            <div style={{marginTop: '10px'}}>
                <Button type="primary" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};

export default Push;
