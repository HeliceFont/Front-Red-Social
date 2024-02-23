
import { PublicationList } from './PublicationList'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import UseAuth from '../../hooks/UseAuth'



export const Feed = () => {
    // const [user, setUser] = useState({})
    const { auth } = UseAuth()
    const [publications, setPublications] = useState([])
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true)
    const token = localStorage.getItem('token')
    const params = useParams()

    useEffect(() => {
        getPublications(1, false)
    }, [])

    // const nextPage = () => {
    //     let next = page + 1
    //     setPage(next)
    //     getPublications(next)
    // }

    const getPublications = async (nextPage = 1, showNews = false) => {
        if(showNews){
            setPublications([])
            setPage(1)
            
        }
        const request = await fetch(Global.url + "publication/feed/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await request.json()
        
        if (data.publications && data.status === "success") {
            console.log(data.publications)
            let newPublications = data.publications

            if (!showNews && publications.length >= 1) {
                newPublications = [...publications, ...data.publications]
            }
            
            setPublications(newPublications)

            if (!showNews && publications.length >= data.total - data.publications.length) {
                setMore(false)
            }
            if(data.pages <=1){
                setMore(false)
            }
            
        }
    }

    return (
        <>
            

                <header className="content__header">
                    <h1 className="content__title">Timeline</h1>
                    <button className="content__button" onClick={()=> getPublications(1, true)}>Mostrar nuevas</button>
                </header>

                <PublicationList
                    publications={publications}
                    getPublications={getPublications}
                    page={page}
                    setPage={setPage}
                    more={more}
                    setMore={setMore}

                />

                {/* {more &&
                    <div className="content__container-btn">
                        <button className="content__btn-more-post" onClick={nextPage}>
                            Ver mas publicaciones
                        </button>
                    </div>
                } */}
                <br />

        </>
    )
}
