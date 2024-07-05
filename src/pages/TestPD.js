import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const TestPD = () => {
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
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="left flex-1">
          {/*** Product Image ***/}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-2/3 relative">
              <img
                src="http://res.cloudinary.com/dduhdhj77/image/upload/v1718693672/mernfolder/iiixnyya1rn0ne0de10i.jpg"
                className="w-full h-full object-cover mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />

              {/*** Product Zoom ***/}
              {zoomImage && (
                <div className="hidden lg:block absolute w-[300px] h-[300px] overflow-hidden bg-slate-200 p-1 -right-[320px] top-0">
                  <div
                    className="w-full h-full scale-150"
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
                    }}
                  ></div>
                </div>
              )}
            </div>

            <div className="flex lg:flex-col gap-2 overflow-auto scrollbar-none">
              {loading
                ? productImageListLoading.map((_, index) => (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  ))
                : data?.productImage?.map((imgURL, index) => (
                    <div
                      className="h-20 w-20 rounded cursor-pointer"
                      key={imgURL}
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    >
                      <img
                        src={imgURL}
                        className="w-full h-full object-cover"
                        alt="Product"
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="right flex-1">
          {/*** Product Details ***/}
          <div className="flex flex-col gap-4">
            <p className="bg-red-200 text-red-600 px-2 py-1 rounded-full w-fit">
              Ceiling Light
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              Light
            </h2>
            <p className="capitalize text-slate-400">Lightify</p>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">899</p>
              <p className="text-slate-400 line-through">999</p>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>This is a three light industrial looking pendant, this light fixture provide a very classy and antique industrial look, This lamp is a hard wired fixture. This fixture doesn’t have a glass or plastic globe it is made of metal. Application places: kitchen island, dining room, staircase, stairwell, entryway, hallway, dining room, bar restaurant and other relaxing places. This lamp need three 40W E26 Edison bulbs, (BULB ARE NOT INCLUDED), there is the maximum 60w for one light. This ceiling lamp is made of Iron, black finished metal, brings antique and rustic atmosphere to your place</p>
            </div>

            <hr />

            <div className="w-full flex flex-col items-center gap-3 my-2">
              <button
                className="border-2 border-[#ffc470] rounded px-3 py-1 min-w-[120px] text-[#ffc470] font-medium hover:bg-[#ffc470] hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-[#ffc470] rounded px-3 py-1 min-w-[120px] font-medium text-white bg-[#ffc470] hover:text-[#ffc470] hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 mt-10">
        <img
          src="http://res.cloudinary.com/dduhdhj77/image/upload/v1718693672/mernfolder/iiixnyya1rn0ne0de10i.jpg"
          className="w-full h-full object-cover mix-blend-multiply"
          onMouseMove={handleZoomImage}
          onMouseLeave={handleLeaveImageZoom}
        />
      </div>
    </div>
  );
};

export default TestPD;
