import { useContext } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

import GithubContext from '../../context/github/GithubContext';

const UserResults = () => {
	const { users, loading, error } = useContext(GithubContext);

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<>
				<div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8'>
					{users && users.length > 0 ? (
						users.map((user) => <UserItem key={user.id} user={user} />)
					) : error ? (
						<>No users found!</>
					) : (
						<></>
					)}
				</div>
			</>
		);
	}
};

export default UserResults;
