import { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './multiCarousel.scss';
import api from '@/services/api';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    productPictures: {
        id: string;
        path: string;
    }[]
}

export default function MultiCarousel() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    useEffect(() => {
        api.productApi.findByCategory("64f975f8b16996d6828e4982")
            .then(res => {
                if (res.status == 200) {
                    setProducts(res.data.data)
                    console.log("res", res.data.data);
                }
            })
    }, []);

    return (
        <div className='multicarousel-container'>
            <h2>Featured Products</h2>
            <Carousel
                autoPlay={true}
                // autoPlaySpeed={1000}
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={1500}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 6,
                        partialVisibilityGutter: 50
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {products?.map((product: Product, index: number) => (
                    <div className='product' onClick={() => navigate(`/products/${product.id}`)}>
                        <img src={product.avatar} alt="" />
                        <p>{product.name}</p>
                    </div>
                ))}
                {/* <div className='product'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Fbanner%2Fproduct-01.webp?alt=media&token=965263a5-09cd-4b70-ba04-8e598fdd092c" alt="" />
                    <p>Coffee</p>
                </div>
                <div className='product'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Fbanner%2Fproduct-02.webp?alt=media&token=6fe14414-36fd-4482-a00c-1c725684e498" alt="" />
                    <p>Coffee</p>
                </div>
                <div className='product'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Fbanner%2Fproduct-03.webp?alt=media&token=202bb101-5918-42b3-848d-4e0792e727bd" alt="" />
                    <p>Coffee</p>
                </div>
                <div className='product'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Fbanner%2Fproduct-01.webp?alt=media&token=965263a5-09cd-4b70-ba04-8e598fdd092c" alt="" />
                    <p>Coffee</p>
                </div>
                <div className='product'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Fbanner%2Fproduct-02.webp?alt=media&token=6fe14414-36fd-4482-a00c-1c725684e498" alt="" />
                    <p>Coffee</p>
                </div>
                <div className='product'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/coffee-app-bbb51.appspot.com/o/images%2Fbanner%2Fproduct-03.webp?alt=media&token=202bb101-5918-42b3-848d-4e0792e727bd" alt="" />
                    <p>Coffee</p>
                </div> */}
            </Carousel>
        </div>
    )
}
