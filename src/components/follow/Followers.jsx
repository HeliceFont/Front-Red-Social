import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { UserList } from '../user/UserList';

export const Followers = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const nextPage = () => {
        const next = page + 1;
        setPage(next);
        getUsers(next);
    };
    const getUsers = async (nextPage = 1) => {
        setLoading(true);
        try {
            const response = await fetch(`${Global.url}user/list/${nextPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            const data = await response.json();

            if (data.users && data.status === 'success') {
                const newUsers = users.length >= 1 ? [...users, ...data.users] : data.users;
                setUsers(newUsers);
                setFollowing(data.user_following);
                setLoading(false);
                if (users.length >= data.total - data.users.length) {
                    setMore(false);
                }
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getUsers(1);
    }, []);

    return (
        <>
            <section className="layout__content">
                <header className="content__header">
                    <h1 className="content__title">Gente</h1>
                </header>

                <UserList users={users}
                    getUsers={getUsers}
                    following={following}
                    setFollowing={setFollowing}
                    page={page}
                    more={more}
                    loading={loading}
                />

            </section>
            {loading ? 'Cargando...' : ''}
            {more && (
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Actualizar
                    </button>
                </div>
            )}
        </>
    );
};