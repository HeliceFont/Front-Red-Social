

import avatar from '../../assets/img/user.png';
import { Global } from '../../helpers/Global';
import UseAuth from '../../hooks/UseAuth';

export const UserList = ({ users, following, setFollowing }) => {
  const { auth } = UseAuth();


  const token = localStorage.getItem('token');

  const follow = async (userId) => {
    try {
      const response = await fetch(`${Global.url}follow/save`, {
        method: 'POST',
        body: JSON.stringify({ followed: userId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();

      if (data.status === 'success') {
        setFollowing((prevFollowing) => [...prevFollowing, userId]);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const unfollow = async (userId) => {
    try {
      await fetch(`${Global.url}follow/unfollow/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      let filterFollowings = following.filter((followingUserId) => userId !== followingUserId);
      setFollowing(filterFollowings);
      // setFollowing((prevFollowing) => prevFollowing.filter((id) => id !== userId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <>
      <div className="content__posts">
        {users.map((user) => (
          <article className="posts__post" key={user._id}>
            <div className="post__container">
              <div className="post__image-user">
                <a href="#" className="post__image-link">
                  {user.image !== 'default.png' && (
                    <img
                      src={`${Global.url}user/avatar/${user.image}`}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  )}
                  {user.image === 'default.png' && (
                    <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                  )}
                </a>
              </div>
              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">{`${user.name} ${user.surname}`}</a>
                  <span className="user-info__divider"> | </span>
                  <a href="#" className="user-info__create-date">
                    {user.created_at}
                  </a>
                </div>
                <h4 className="post__content">{user.bio}</h4>
              </div>
            </div>

            {user._id !== auth._id && (
              <div className="post__buttons">
                {!following.includes(user._id) && (
                  <button
                    className="post__button--green"
                    onClick={() => follow(user._id)}
                  >
                    Seguir
                  </button>
                )}
                {following.includes(user._id) && (
                  <button
                    className="post__button"
                    onClick={() => unfollow(user._id)}
                  >
                    Dejar de seguir
                  </button>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
      
    </>
  );
};
