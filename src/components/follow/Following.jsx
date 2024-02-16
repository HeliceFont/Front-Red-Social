import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { UserList } from '../user/UserList';
import { useParams } from 'react-router-dom';

export const Following = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const params = useParams ()

    

    const nextPage = () => {
        const next = page + 1;
        setPage(next);
        getUsers(next);
    };

    // Sacar userId de la url
    const userId = params.userId


    const getUsers = async (nextPage = 1) => {
        setLoading(true);
        try {
            const response = await fetch(Global.url+ 'follow/following/' + userId +'/' + nextPage, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            const data = await response.json();
            console.log(data)

            
            //  Recorrer y limpiar follows para quedarme con followed
            let cleanUsers = []
            data.follows.forEach(follow =>{
                cleanUsers = [...cleanUsers, follow.followed]
            })
            data.users = cleanUsers
            

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
                    <h1 className="content__title">Usuarios que sigue Nombre usuario</h1>
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