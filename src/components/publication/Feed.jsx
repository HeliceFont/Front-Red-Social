import avatar from '../../assets/img/Alber-E.png'


export const Feed = () => {



    return (
        <>
            <section className="layout__content">

                <header className="content__header">
                    <h1 className="content__title">Timeline</h1>
                    <button className="content__button">Mostrar nuevas</button>
                </header>

                <div className="content__posts">

                    <div className="posts__post">

                        <div className="post__container">

                            <div className="post__image-user">
                                <a href="#" className="post__image-link">
                                    <img src={avatar} className="post__user-image" alt="Foto de perfil"/>
                                </a>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">Albert Einstein</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date">Hace 1 hora</a>
                                </div>

                                <h4 className="post__content">Hay una fuerza motriz más poderosa que el vapor, la electricidad y la energía atómica: la voluntad.</h4>

                            </div>

                        </div>


                        <div className="post__buttons">

                            <a href="#" className="post__button">
                                <i className="fa-solid fa-trash-can"></i>
                            </a>

                        </div>

                    </div>

                    <div className="posts__post">

                        <div className="post__container">

                            <div className="post__image-user">
                                <a href="#" className="post__image-link">
                                    <img src={avatar} className="post__user-image" alt="Foto de perfil"/>
                                </a>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">Albert Einstein</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date">Hace 1 hora</a>
                                </div>

                                <h4 className="post__content">¡Triste época la nuestra! Es más fácil desintegrar un átomo que un prejuicio.</h4>

                            </div>
                        </div>

                        <div className="post__buttons">

                            <a href="#" className="post__button">
                                <i className="fa-solid fa-trash-can"></i>
                            </a>

                        </div>

                    </div>


                    <div className="posts__post">

                        <div className="post__container">

                            <div className="post__image-user">
                                <a href="#" className="post__image-link">
                                    <img src={avatar} className="post__user-image" alt="Foto de perfil"/>
                                </a>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">Albert Einstein</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date">Hace 1 hora</a>
                                </div>

                                <h4 className="post__content">Hola, buenos dias.</h4>

                            </div>
                        </div>

                        <div className="post__buttons">

                            <a href="#" className="post__button">
                                <i className="fa-solid fa-trash-can"></i>
                            </a>

                        </div>

                    </div>




                    <div className="posts__post">

                        <div className="post__container">

                            <div className="post__image-user">
                                <a href="#" className="post__image-link">
                                    <img src={avatar} className="post__user-image" alt="Foto de perfil"/>
                                </a>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">Albert Einstein</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date">Hace 1 hora</a>
                                </div>

                                <h4 className="post__content">Hay dos cosas infinitas: el Universo y la estupidez humana. Y del Universo no estoy seguro.</h4>

                            </div>
                        </div>

                        <div className="post__buttons">

                            <a href="#" className="post__button">
                                <i className="fa-solid fa-trash-can"></i>
                            </a>

                        </div>

                    </div>


                </div>

                <div className="content__container-btn">
                    <button className="content__btn-more-post">
                        Ver mas publicaciones
                    </button>
                </div>

            </section>

        </>
    )
}
