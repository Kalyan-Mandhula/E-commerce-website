import Slider from "../components/HMSlider"
import { Container } from "react-bootstrap"
import CategoryCard from "../components/HMCategoryCard"
import Row from "react-bootstrap/Row"
import { useSelector } from "react-redux"
import Metacomponent from "../components/MetaComponent"

const Homepage = ()=>{
    const categories= useSelector((state)=>state.categories.filter((category)=>!category.name.includes("/")))
    return (
        <>
        <Metacomponent />
        <Slider/>
        <Container className="px-0">
        <Row xs={1} md={3} className="mt-2">
        {categories.map((category,idx)=> <CategoryCard category={category} key={idx}/>)}
        </Row>
        </Container>
        </>
    )
}

export default Homepage 