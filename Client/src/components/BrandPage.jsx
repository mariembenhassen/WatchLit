import React, { useEffect } from "react";
import { brandPageStyles, cartPageStyles } from "../assets/dummyStyles";
import { useNavigate, useParams } from "react-router-dom";
import watchesData from "../assets/Categoriesdata";
import { useCart } from "../CartContext";
import { ArrowLeft, ArrowLeftCircleIcon, Watch } from "lucide-react";
import { document } from "postcss";

const BrandPage = () => {
  const { brandName } = useParams(); // exemple brands/rolex
  const navigate = useNavigate();
  const brandWatches = watchesData[brandName?.toLowerCase()] || [];
  const { addItem, cart, increment, decrement } = useCart();
  //to scroll to top when loads page
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      try {
        document.documentElement && (document.documentElement.scrollTo = 0);
        document.body && (document.body.scrollTop = 0);
      } catch (e) {
        /* ignore  */
      }
    }
  }, []);
  const findInCart = (id) => cart.find((p) => p.id === id);
  // if no watches found
  if (!brandWatches.length) {
    return (
      <div className={brandPageStyles.mainContainer}>
        <div className={brandPageStyles.notFoundCard}>
          <h2 className={brandPageStyles.notFoundTitle}>No watches found</h2>
          <p className={brandPageStyles.notFoundText}>
            This brand has no watches listed in our collection yet.
          </p>
          <button
            onClick={() => navigate(-1)}
            className={brandPageStyles.goBackButton}
          >
            <ArrowLeft size={18} />
            Go back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={brandPageStyles.mainContainer}>
      <div className=" max-w-7xl mx-auto relative">
        <div className={brandPageStyles.headerContainer}>
          <div className={brandPageStyles.backButtonContainer}>
            <button
              className={brandPageStyles.backButton}
              onClick={() => navigate(-1)}
            >
              <div className={brandPageStyles.backIcon}>
                <ArrowLeftCircleIcon size={20}></ArrowLeftCircleIcon>
              </div>
              <span className={brandPageStyles.backText}>Back</span>
            </button>
          </div>
          <div className={brandPageStyles.titleContainer}>
            <h1 className={brandPageStyles.title}>{brandName} Collection</h1>
          </div>
        </div>
        {/* watches grid*/}
        <div className={brandPageStyles.grid}>
  {brandWatches.map((watch) => {
  const inCart = findInCart(watch.id);
  return (
    <div key={watch.id} className={brandPageStyles.card}>
      <div className={brandPageStyles.imageContainer}>
        <img
          src={watch.image}
          alt={watch.name}
          className={brandPageStyles.image}
        />
      </div>

      <div className={brandPageStyles.detailsContainer}>
        <h2 className={brandPageStyles.watchName}>{watch.name}</h2>

        {/* Example: show different UI based on inCart */}
        {inCart ? (
          <div className="mt-2 text-sm text-green-600">
            In cart • Qty: {inCart.qty}
          </div>
        ) : (
          <button
            onClick={() => addItem(watch)}
            className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
})}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
