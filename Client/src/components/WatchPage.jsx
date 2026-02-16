import React, { useMemo, useState } from "react";
import { watchPageStyles } from "../assets/dummyStyles"; // ← your updated styles
import { WATCHES, FILTERS as RAW_FILTERS } from "../assets/dummywdata";
import { useCart } from "../CartContext";
import { Grid, User, Users, Plus, Minus, ShoppingCart } from "lucide-react";

const ICON_MAP = { Grid, User, Users };

const FILTERS = RAW_FILTERS?.length
  ? RAW_FILTERS.map((f) => ({ ...f, icon: ICON_MAP[f.iconName] ?? Grid }))
  : [
      { key: "all", label: "All", icon: Grid },
      { key: "men", label: "Men", icon: User },
      { key: "women", label: "Women", icon: Users },
    ];

const WatchPage = () => {
  const [filter, setFilter] = useState("all");
  const { cart, addItem, increment, decrement, removeItem } = useCart();

  const filteredWatches = useMemo(() => {
    if (filter === "all") return WATCHES;
    return WATCHES.filter((w) => w.gender?.toLowerCase() === filter.toLowerCase());
  }, [filter]);

  const getQty = (id) => {
    const item = cart.find((c) => String(c.id) === String(id));
    return item ? Number(item.qty || 0) : 0;
  };

  return (
    <div className={watchPageStyles.container}>
      {/* Header + Filters */}
      <div className={watchPageStyles.headerContainer}>
        <div>
          <h1 className={watchPageStyles.headerTitle}>
            Timepieces{" "}
            <span className={watchPageStyles.titleAccent}>Curated</span>
          </h1>
          <p className={watchPageStyles.headerDescription}>
            Discover timeless elegance with our handpicked collection
          </p>
        </div>

        <div className={watchPageStyles.filterContainer}>
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const isActive = filter === f.key;

            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`
                  ${watchPageStyles.filterButtonBase}
                  ${isActive ? watchPageStyles.filterButtonActive : watchPageStyles.filterButtonInactive}
                `}
              >
                <Icon className={watchPageStyles.filterIcon} />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Watch Grid */}
      <div className={watchPageStyles.grid}>
        {filteredWatches.length === 0 ? (
          <p className={watchPageStyles.noWatchesText}>
            No watches found in this category.
          </p>
        ) : (
          filteredWatches.map((watch) => {
            const qty = getQty(watch.id);
            const inCart = qty > 0;
            const sid = String(watch.id ?? watch._id ?? watch.sku ?? watch.name);

            return (
              <div key={sid} className={watchPageStyles.card}>
                <div className={watchPageStyles.imageContainer}>
                  <img
                    src={watch.img}
                    alt={watch.name}
                    className={watchPageStyles.image}
                    draggable={false}
                  />

                  {/* Cart overlay controls */}
                  <div className={watchPageStyles.cartControlsContainer}>
                    {inCart ? (
                      <div className={watchPageStyles.cartQuantityControls}>
                        <button
                          onClick={() => decrement(watch.id)}
                          className={`${watchPageStyles.quantityButton} hover:bg-gray-100`}
                        >
                          <Minus className={watchPageStyles.quantityIcon} />
                        </button>

                        <span className={watchPageStyles.cartQuantity}>{qty}</span>

                        <button
                          onClick={() => increment(watch.id)}
                          className={`${watchPageStyles.quantityButton} hover:bg-gray-100`}
                        >
                          <Plus className={watchPageStyles.quantityIcon} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addItem({ ...watch, qty: 1 })}
                        className={watchPageStyles.addToCartButton}
                      >
                        <ShoppingCart className={watchPageStyles.addToCartIcon} />
                        Add
                      </button>
                    )}
                  </div>
                </div>

                <div className={watchPageStyles.productInfo}>
                  <h3 className={watchPageStyles.productName}>{watch.name}</h3>
                  <p className={watchPageStyles.productDescription}>
                    {watch.brand || "Premium"}
                  </p>
                  <p className={watchPageStyles.productPrice}>
                    ${watch.price?.toLocaleString() ?? "—"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WatchPage;