import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { UserList } from '../user/UserList';
import { useParams } from 'react-router-dom';
import { GetProfile } from '../../helpers/getProfile';
// import UseAuth from '../../hooks/UseAuth';


export const Following = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({})
    const token = localStorage.getItem('token');
    // const { auth } = UseAuth();
    const params = useParams();

    useEffect(() => {
        getUsers(1);
        GetProfile(params.userId, setUserProfile)
    }, []);

    const nextPage = () => {
        const next = page + 1;
        setPage(next);
        getUsers(next);
    };



    const getUsers = async (nextPage = 1) => {
        // efecto de carga
        setLoading(true)

        // Sacar userId de la url
        const userId = params.userId;

        // Peticion para sacar usuarios
        const response = await fetch(Global.url + 'follow/following/' + userId + '/' + nextPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        const data = await response.json();

        //  Recorrer y limpiar follows para quedarme con followed
        let cleanUsers = []
        data.follows.forEach(follow => {
            cleanUsers = [...cleanUsers, follow.followed]
        })
        data.users = cleanUsers
        
        // Crear un estado para poder listarlos
        if (data.users && data.status == 200) {

            let newUsers = data.users;
            
            if (users.length >= 1) {
                newUsers = [...users, data.users]
            }
            
            setUsers(newUsers);
            setFollowing(data.user_following);
            setLoading(false);

            // Paginación
            if (users.length >= (data.total - data.users.length)) {
                setMore(false);
            }
        }

    };

    return (
        <>
            
                <header className="content__header">
                    <h1 className="content__title">Usuarios que sigue {userProfile.name} {userProfile.surname}</h1>
                </header>

                <UserList
                    users={users}
                    getUsers={getUsers}
                    following={following}
                    setFollowing={setFollowing}
                    page={page}
                    more={more}
                    loading={loading}
                />
            
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
