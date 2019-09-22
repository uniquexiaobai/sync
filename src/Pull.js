import React, { useState, useRef } from 'react';
import { Input, Button, message as messageModal } from 'antd';
import { useCopyClipboard } from '@lokibai/react-use-copy-clipboard';
import { get as getMessageByCode } from './leancloud';

const Pull = () => {
	const [code, setCode] = useState('');
	const [isCopied, setCopied] = useCopyClipboard();
	const lastCodeRef = useRef(null);

	const handleChange = (e) => {
		setCode(e.target.value);
	};

	const handleSubmit = async () => {
		if (isCopied && lastCodeRef.current === code) return;
		const message = await getMessageByCode(code);

		if (message) {
			setCopied(message);
			messageModal.success(`the message '${message}' is copied`);
			console.log(code, message);
		} else {
			messageModal.error(`the code is illegal`);
		}
		lastCodeRef.current = code;
	};

	return (
		<div>
			<div>
				<Input
					placeholder='Please input your message key'
					value={code}
					onChange={handleChange}
				/>
			</div>
			<div style={{ marginTop: '10px' }}>
				<Button type='primary' onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default Pull;
