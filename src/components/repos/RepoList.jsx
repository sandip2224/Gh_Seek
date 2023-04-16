import React from 'react';
import RepoItem from './RepoItem';

function RepoList({ repos }) {
	return (
		<div className='rounded-1g shadow-1g card bg-base-100'>
			<div className='card-body'>
				<h2 className='text-3x1 my-4 font-bold card-title'>
					Latest Respositories
				</h2>
				{repos.map((repo) => (
					<RepoItem key={repo.id} repo={repo} />
				))}
			</div>
		</div>
	);
}

export default RepoList;
