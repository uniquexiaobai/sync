import React, { useState, useRef } from 'react';
import {
	Row,
	Col,
	Result,
	Icon,
	Input,
	Button,
	message as messageModal,
} from 'antd';
import { useCopyClipboard } from '@lokibai/react-use-copy-clipboard';
import { get as getMessageByCode } from './leancloud';

const Pull = () => {
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [isCopied, setCopied] = useCopyClipboard();
	const lastCodeRef = useRef(null);

	const handleChange = (e) => {
		setCode(e.target.value);
	};

	const handleSubmit = async () => {
		setLoading(true);

		const message = await getMessageByCode(code);

		if (message) {
			lastCodeRef.current = message;
			setCopied(message);
			messageModal.success('Copied');
		} else {
			// 非法的
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
			subTitle={code}
			extra={
				<Button type='primary' onClick={handleCopy}>
					Copy
				</Button>
			}
		/>
	) : (
		<Row>
			<Col span={24}>
				<Input
					placeholder='Enter your message code to pull'
					size='large'
					value={code}
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

export default Pull;
