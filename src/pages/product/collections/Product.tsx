import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './product.scss'
import Test from '@/components/Test';
import api from '@/services/api';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { message } from 'antd';

export interface Prop {
  count: number
  handlePrintCount: (count: number) => void
}

interface Product {
  id: string,
  name: string,
  avatar: string,
  price: number,
  des: string,
  categoryId: number,
  categoryName: string,
  updateAt: Date
}

interface Category {
  id: string,
  title: string
}

interface CartItem {
  productId: string,
  quantity: number
}

export default function Product() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productsVisible, setProductsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const store = useSelector(store => store) as StoreType;

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      api.productApi.findByCategory(categoryId)
        .then(res => {
          // console.log("res", res)
          if (res.status == 200) {
            setProducts(res.data.data)
            setLoading(false);
          } else {
          }
        })
        .catch(err => {
          setLoading(false);
        })
    }
  }, [categoryId])

  function handleAddToCart(productId: string) {
    let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
    if (carts.length == 0) {
      // cart rỗng
      carts.push({
        productId,
        quantity: 1
      })
    } else {
      // cart có sản phẩm
      let flag: boolean = false;
      carts = carts.map(item => {
        if (item.productId == productId) {
          message.success("addToCartSuccess");
          item.quantity += 1
          flag = true;
        }
        return item
      })
      if (!flag) {
        carts.push({
          productId,
          quantity: 1
        })
        message.success("addToCartSuccess");
      }
    }
    localStorage.setItem("carts", JSON.stringify(carts)) // save to local
  }

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 600);
  //   return () => clearTimeout(timeout);
  // })
  // const [count, setCount] = useState(0);
  // const [count2, setCount2] = useState(0);
  // const handlePrintCount = useCallback((count: number) => {
  //   alert("count is:" + count)
  // }, [count])

  // const handlePrintCount = (count: number) => {
  //   alert("count is:" + count)
  // }

  return (
    <div className='products-container'>
      {/* <button onClick={() => {
        setCount(count + 1)
      }}>Tang1</button>
      <p>{count}</p>
      <button onClick={() => {
        setCount2(count2 + 1)
      }}>Tang2</button>
      <p>{count2}</p>
      <Test count={count} handlePrintCount={handlePrintCount} /> */}
      <div className='collection-navgivation'>
        {store.categoryStore.data?.map((category: Category, index: number) => (
          <span className='active' key={Math.random() * Date.now()} onClick={() => navigate(`/collections/${(category as Category).id}`)}>
            {(category as Category).title}
          </span>
        ))}
      </div>
      <div className='product-items'>
        {loading ? <div className="d-flex justify-content-center loading-wrapper">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> : products?.map((product: Product, index: number) => (
          <div key={Math.random() * Date.now()} className="product-item">
            <div className='product-item-image' onClick={() => navigate(`/products/${(product as Product).id}`)}>
              <img src={(product as Product).avatar} alt="noImage" />
            </div>
            <div className='product-item-content'>
              <h3>{(product as Product).name}</h3>
              <p className='product-item-price'>${(product as Product).price}</p>
            </div>
            <button className='addToCart-button' onClick={() => handleAddToCart(product.id)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}
