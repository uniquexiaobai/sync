import React, { useState, useContext } from 'react';
import { Input, Button, message } from 'antd';
import { useCopyClipboard } from '@lokibai/react-use-copy-clipboard';
import { FirebaseContext } from './context';

const Pull = () => {
    const firebase = useContext(FirebaseContext);
    const [value, setValue] = useState('');
    const [isCopied, setCopied] = useCopyClipboard();

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = async () => {
        if (isCopied) return;
        
        const doc = await firebase.firestore().collection('messages').doc(value).get();

        if (doc.exists) {
            const data = doc.data().message;
            setCopied(doc.data().message);
            message.success(`${data} is copied`);
            console.log(value, data);
        }
    };

    return (
        <div>
            <div>
                <Input 
                    placeholder="Please input your message key" 
                    value={value}
                    onChange={handleChange} 
                />
            </div>
            <div style={{marginTop: '10px'}}>
                <Button type="primary" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};

export default Pull;
