import React, { useState } from 'react';
import { Input, Button, message as messageModal } from 'antd';
import { useCopyClipboard } from '@lokibai/react-use-copy-clipboard';
import { set as saveMessage } from './leancloud';

const createCode = (len = 4) => {
	const min = 97;
	const max = 122;
	const ret = Array.from({ length: len }, () => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	});

	return String.fromCharCode(...ret);
};

const { TextArea } = Input;

const Push = () => {
	const [message, setMessage] = useState('');
	const [isCopied, setCopied] = useCopyClipboard();

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = async () => {
		if (isCopied) return;
		const code = createCode();
		const isSaved = await saveMessage(code, message);

		if (isSaved) {
			setCopied(code);
			messageModal.success(
				`use the code '${code}' to pull, the code is copied`,
			);
			console.log(code, message);
		}
	};

	return (
		<div>
			<div>
				<TextArea
					placeholder='Please input your message value'
					value={message}
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

export default Push;
