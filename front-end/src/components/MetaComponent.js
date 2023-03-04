import {Helmet,HelmetProvider} from "react-helmet-async"


const Metacomponent = ({title="Supershop",description="Quick And Quality"})=>{
   return (<HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Helmet>

    </HelmetProvider>)
}


export default Metacomponent