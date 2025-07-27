export default function (error: any, event: any) {
	console.error('Server error:', error);

	return {
		statusCode: error.statusCode || 500,
		statusMessage: error.statusMessage || 'Internal Server Error',
		data: {
			message: 'Something went wrong',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined,
		},
	};
}
