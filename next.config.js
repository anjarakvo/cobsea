/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://digital.gpmarinelitter.org/api/:path*',
			},
			{
				source: '/image/:path*',
				destination: 'https://digital.gpmarinelitter.org/image/:path*',
			},
		];
	},
	experimental: {
		images: {
			layoutRaw: true,
		},
	},
};

module.exports = nextConfig;
