import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { UserList } from '../user/UserList';
import { useParams } from 'react-router-dom';
import { GetProfile } from '../../helpers/getProfile';

export const Followers= () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile]= useState({});

    const token = localStorage.getItem('token');

    const params = useParams ()

    useEffect(() => {
        getUsers(1);
        GetProfile(params.userId, setUserProfile)
    }, []);

    const nextPage = () => {
        const next = page + 1;
        setPage(next);
        getUsers(next);
    };

    // Sacar userId de la url
    const userId = params.userId


    const getUsers = async (nextPage = 1) => {
        setLoading(true);
       
            const response = await fetch(Global.url+ 'follow/followers/' + userId +'/' + nextPage, {
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
        
            setLoading(false);
        
    };
    

    return (
        <>
            <section className="layout__content">
                <header className="content__header">
                    <h1 className="content__title">Seguidores de {userProfile.name}{userProfile.surname}</h1>
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