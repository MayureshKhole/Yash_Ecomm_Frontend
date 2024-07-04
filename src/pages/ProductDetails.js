import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategroyWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  console.log("data", data);

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-24">
        {/* Product Image */}
        <div className="flex flex-col lg:flex-row-reverse gap-4 w-full lg:w-1/2">
          <div className="relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-cover mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {zoomImage && (
              <div className="hidden lg:block absolute overflow-hidden bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
            {product.images.map((imgURL, index) => (
              <img
                src={imgURL}
                className="w-20 h-20 object-cover mix-blend-multiply cursor-pointer"
                onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                key={index}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
            {product.brandName}
          </p>
          <h2 className="text-3xl lg:text-5xl font-medium">
            {product.productName}
          </h2>
          <p className="capitalize text-slate-400">{product.category}</p>

          <div className="flex items-center gap-2 text-2xl lg:text-4xl font-medium my-1">
            <p className="text-red-600">
              {displayCurrency(product.sellingPrice)}
            </p>
            <p className="text-slate-400 line-through">
              {displayCurrency(product.price)}
            </p>
          </div>

          <div>
            <p className="text-slate-600 font-medium my-1">Description:</p>
            <p>{product.description}</p>
          </div>

          <div className="flex items-center gap-3 my-2">
            <button
              className="border-2 border-[#ffc470] rounded px-3 py-1 min-w-[120px] text-[#ffc470]font-medium hover:bg-[#ffc470] hover:text-white"
              onClick={() => handleBuyProduct(product.id)}
            >
              Buy
            </button>
            <button
              className="border-2 border-[#ffc470] rounded px-3 py-1 min-w-[120px] font-medium text-white bg-[#ffc470] hover:text-[#ffc470] hover:bg-white"
              onClick={() => handleAddToCart(product.id)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {data.category && (
        <CategroyWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
