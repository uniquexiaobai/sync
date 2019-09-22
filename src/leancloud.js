import AV from 'leancloud-storage';

export const init = () => {
	AV.init({
		appId: 'vxGXIkIdct8QzbixHeznjKXV-gzGzoHsz',
		appKey: 'oth1nhfurVFhPsJEiLz7gXpE',
	});
};

export const set = async (code, message) => {
	const Message = AV.Object.extend('Message');
	const instance = new Message();

	instance.set('code', code);
	instance.set('message', message);

	return instance.save();
};

export const get = async (code) => {
	const query = new AV.Query('Message');

	query.equalTo('code', code);

	const doc = await query.first();

	return doc && doc.get && doc.get('message');
};
