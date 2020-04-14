import RNFetchBlob from 'rn-fetch-blob';

export const clearCache = async () => {
	const { unlink, dirs } = RNFetchBlob.fs;
	await unlink(dirs.DocumentDir + '/.soundspice');
};
