import {Helmet} from 'react-helmet'
import '../css/components/notFound.css'

const NotFount404 = ()=>{
    return(
        <>
        <Helmet>
               <title>Page not Fount</title>
               <meta name="description" content="Page not found" />
        </Helmet>
        <div className="notFound">
            <div className="notFound__container">
                <h1 className="notFound__container__h1">404</h1>
                <p className="notFound__container__p"   >
                    Opps! That page could not found
                </p>
            </div>

        </div>
        </>
    )
}


export default NotFount404;