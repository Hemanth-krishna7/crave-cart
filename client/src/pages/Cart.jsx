import PageWrapper from '@/components/common/PageWrapper';
import RestaurantCartSection from '@/components/cart/RestaurantCartSection';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import { useCartStore, selectSubtotal, selectTotalItems } from '@/store/cartStore';
import { groupCartItemsByRestaurant } from '@/utils/cartHelpers';

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = useCartStore(selectSubtotal);
  const totalItems = useCartStore(selectTotalItems);

  // Group items in a single pass using the shared helper
  const groupedRestaurants = groupCartItemsByRestaurant(cartItems);

  return (
    <PageWrapper title="My Cart" className="pb-16" containerClassName="max-w-7xl">
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Shopping Cart
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              You have {totalItems} {totalItems === 1 ? 'item' : 'items'} across{' '}
              <span className="font-semibold text-slate-800">
                {groupedRestaurants.length} {groupedRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
              </span>{' '}
              in your cart.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left list (2/3 of grid) */}
            <div className="lg:col-span-2 space-y-6">
              {groupedRestaurants.map((group) => {
                const restaurantName = group.restaurant ? group.restaurant.name : 'Restaurant';
                return (
                  <RestaurantCartSection
                    key={group.restaurantId}
                    restaurantId={group.restaurantId}
                    restaurantName={restaurantName}
                    deliveryTime={group.restaurant?.deliveryTime}
                    items={group.items}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeItem}
                  />
                );
              })}
            </div>

            {/* Right Summary Panel (1/3 of grid) */}
            <div className="lg:sticky lg:top-24">
              <CartSummary subtotal={subtotal} />
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
