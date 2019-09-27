import React, { useState, useRef } from 'react';
import {
	Result,
	Icon,
	Row,
	Col,
	Input,
	Button,
	message as messageModal,
} from 'antd';
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
	const [loading, setLoading] = useState(false);
	const [isCopied, setCopied] = useCopyClipboard();
	const lastCodeRef = useRef(null);

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const handleSubmit = async () => {
		setLoading(true);

		const code = createCode();
		const isSaved = await saveMessage(code, message);

		if (isSaved) {
			lastCodeRef.current = code;
			setCopied(code);
            messageModal.success('Copied');
		} else {
            // 失败
        }
        setLoading(false);
	};

	const handleCopy = () => {
		setCopied(lastCodeRef.current);
		messageModal.success('Copied');
	};

	return isCopied ? (
		<Result
			icon={<Icon type='smile' theme='twoTone' />}
			title={lastCodeRef.current}
			subTitle={message}
			extra={
				<Button type='primary' onClick={handleCopy}>
					Copy
				</Button>
			}
		/>
	) : (
		<Row>
			<Col span={24}>
				<TextArea
					autosize={{ minRows: 3 }}
					size='large'
					placeholder='Enter your message to push'
					value={message}
					onChange={handleChange}
				/>
			</Col>
			<Col span={24} style={{ marginTop: '10px' }}>
				<Button
					block
					size='large'
					type='primary'
					loading={loading}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Col>
		</Row>
	);
};

export default Push;
