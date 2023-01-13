import React, {useState} from "react";
import { useEffect } from "react";
import axios from 'axios'
import LayoutApp from "../../components/layout";
import { Col, Row } from 'antd';
import Product from "../../components/Product";
import { useDispatch } from "react-redux";

const Home = () => {

    const dispatch = useDispatch();

    const [productData, setProductData]= useState([]);
    const [selectedCategory, setSelectedCategory] = useState('face');
    const categories = [
        {
            name: "face",
            imageUrl: "https://images.pexels.com/photos/5217926/pexels-photo-5217926.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            name: "body",
            imageUrl: "https://images.pexels.com/photos/5938558/pexels-photo-5938558.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            name: "hair",
            imageUrl: "https://images.pexels.com/photos/8467971/pexels-photo-8467971.jpeg?auto=compress&cs=tinysrgb&w=1600",
        }
    ]

    useEffect(()=>{
        const getAllProducts = async()=>{
            try{
                dispatch({
                    type:"SHOW_LOADING",
                });
                const{data} = await axios.get('api/products/getproducts');
                setProductData(data);
                dispatch({
                    type:"HIDE_LOADING",
                });
                console.log(data);
            } catch (error){
                console.log(error)
            }
        }
        getAllProducts();
    },[dispatch])

    return ( 
        <LayoutApp>
            <div className="category">
                {categories.map((category)=>(
                    <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`} onClick={()=> setSelectedCategory(category.name)}>
                        <h3 className="categoryName">{category.name}</h3>
                        <img src={category.imageUrl} alt={category.name} height={60} widht={60}/>
                    </div>
                ))}
            </div>
            <Row>
                {productData.filter((i)=> i.category === selectedCategory).map(product=>(
                    <Col xs={24} sm={6} md={12} lg={6}>
                        <Product key={product.id} product={product}/>
                    </Col>
                ))}
            </Row>
        </LayoutApp>
     );
}
 
export default Home;