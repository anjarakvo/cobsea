import Link from 'next/link';
import Image from 'next/image';

export const TopBar = () => {
	return (
		<div className='topbar'>
			<div className='container'>
				<Link href='/'>
					<a>
						<Image src='/cobsea.svg' alt='COBSEA' width={162} height={42} />
					</a>
				</Link>
				<nav>
					<Link href='/knowledge-library'>Knowledge library</Link>
					&nbsp;|&nbsp;
					<span>Research database</span>
				</nav>
			</div>
		</div>
	);
};

export default function Layout({ children }) {
	return (
		<>
			<TopBar />
			<main>{children}</main>
		</>
	);
}
